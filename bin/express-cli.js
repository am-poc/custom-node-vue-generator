#!/usr/bin/env node

var ejs = require('ejs')
var fs = require('fs')
var minimatch = require('minimatch')
var mkdirp = require('mkdirp')
var path = require('path')
var program = require('commander')
var readline = require('readline')
var sortedObject = require('sorted-object')
var util = require('util')

var MODE_0666 = parseInt('0666', 8)
var MODE_0755 = parseInt('0755', 8)
var TEMPLATE_DIR = path.join(__dirname, '..', 'templates')
var VERSION = require('../package').version

var _exit = process.exit

// Re-assign process.exit because of commander
// TODO: Switch to a different command framework
process.exit = exit

// CLI

around(program, 'optionMissingArgument', function (fn, args) {
	program.outputHelp()
	fn.apply(this, args)
	return { args: [], unknown: [] }
})

before(program, 'outputHelp', function () {
	// track if help was shown for unknown option
	this._helpShown = true
})

before(program, 'unknownOption', function () {
	// allow unknown options if help was shown, to prevent trailing error
	this._allowUnknownOption = this._helpShown
	
	// show help if not yet shown
	if (!this._helpShown) {
		program.outputHelp()
	}
})

program
.name('express')
.version(VERSION, '    --version')
.usage('[options] [dir]')
.option('-e, --ejs', 'add ejs engine support', renamedOption('--ejs', '--view=ejs'))
.option('    --pug', 'add pug engine support', renamedOption('--pug', '--view=pug'))
.option('    --hbs', 'add handlebars engine support', renamedOption('--hbs', '--view=hbs'))
.option('-H, --hogan', 'add hogan.js engine support', renamedOption('--hogan', '--view=hogan'))
.option('-v, --view <engine>', 'add view <engine> support (dust|ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)')
.option('    --no-view', 'use static html instead of view engine')
.option('-c, --css <engine>', 'add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)')
.option('    --git', 'add .gitignore')
.option('-f, --force', 'force on non-empty directory')
.parse(process.argv)

if (!exit.exited) {
	main()
}

/**
 * Install an around function; AOP.
 */

function around (obj, method, fn) {
	var old = obj[method]
	
	obj[method] = function () {
		var args = new Array(arguments.length)
		for (var i = 0; i < args.length; i++) args[i] = arguments[i]
		return fn.call(this, old, args)
	}
}

/**
 * Install a before function; AOP.
 */

function before (obj, method, fn) {
	var old = obj[method]
	
	obj[method] = function () {
		fn.call(this)
		old.apply(this, arguments)
	}
}

/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm (msg, callback) {
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})
	
	rl.question(msg, function (input) {
		rl.close()
		callback(/^y|yes|ok|true$/i.test(input))
	})
}

/**
 * Copy file from template directory.
 */

function copyTemplate (from, to) {
	write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'))
}

/**
 * Copy multiple files from template directory.
 */

function copyTemplateMulti (fromDir, toDir, nameGlob) {
	fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
	.filter(minimatch.filter(nameGlob, { matchBase: true }))
	.forEach(function (name) {
		copyTemplate(path.join(fromDir, name), path.join(toDir, name))
	})
}

/**
 * Create application at the given directory.
 *
 * @param {string} name
 * @param {string} dir
 */

function createApplication (name, dir) {
	console.log()
	
	// JavaScript
	var app = loadTemplate('js/app.js')
	var www = loadTemplate('js/www')
	
	populateLocals(www, app, name)
	
	// generate package.json for serverside
	let pkg = generatePakcageFile(app, name)
	
	// create serverside and clientside main folders
	createFolders(dir)
	
	// copy serverside template files: copyTemplateMulti(fromDir, toDir)
	copyFiles(dir)
	
	
	// write files
	writeFiles(dir, app, www, pkg)
	
	// Mount Common CTED Routes
	mountRoutes(app)
	
	// Show prompts for next steps
	postInstall(dir, name)
}

function populateLocals(www, app, name){
	// App name
	www.locals.name = name
	
	// App modules, routes, and uses
	app.locals.localModules = Object.create(null)
	app.locals.modules = Object.create(null)
	app.locals.mounts = []
	app.locals.uses = []
}

function generatePakcageFile(app, name){
	// Package
	var pkg = {
		name: name,
		version: '0.0.0',
		private: true,
		scripts: {
			start: 'node ./server/bin/www'
		},
		dependencies: {
			'debug': '~2.6.9',
			'express': '~4.16.0'
		}
	}
	
	// add import statements for modules/packages
	app.locals.modules.logger = 'winston'
	app.locals.modules.cookieParser = 'cookie-parser'
	app.locals.modules.bodyParser = 'body-parser'
	app.locals.modules.expressValidator = 'express-validator'
	app.locals.modules.passport = 'passport'
	// CTED modules
	app.locals.modules.pgDB = './db/pg'
	app.locals.modules.mongoDB = './db/mongo'
	
	/*app.locals.modules.jwt = 'jsonwebtoken'
	app.locals.modules.bcrypts = 'bcryptjs'
	app.locals.modules.passportJWT = 'passport-jwt'
	app.locals.modules.passportLocal = 'passport-local'
	app.locals.modules.pg = 'pg'*/
	
	// add 'app.use' statements
	app.locals.uses.push('bodyParser.json({ parameterLimit: 100000, limit: \'60mb\' })')
	app.locals.uses.push('bodyParser.raw({ parameterLimit: 100000, limit: \'60mb\' })')
	app.locals.uses.push('express.urlencoded({ parameterLimit: 100000, limit: \'60mb\', extended: false})')
	app.locals.uses.push('expressValidator()')
	app.locals.uses.push('cookieParser()')
	app.locals.uses.push('passport.initialize()')
	
	// add dependencies to the package.json
	pkg.dependencies.winston = '~2.3.1'
	pkg.dependencies['cookie-parser'] = '~1.4.3'
	pkg.dependencies['jsonwebtoken'] = '^8.2.2'
	pkg.dependencies['bcryptjs'] = '~2.4.3'
	pkg.dependencies['passport'] = '~0.4.0'
	pkg.dependencies['passport-jwt'] = '~2.2.1'models
	pkg.dependencies['passport-local'] = '~1.0.0'
	pkg.dependencies['pg'] = '~6.4.2'
	pkg.dependencies['connect-mongo'] = '^2.0.1'
	pkg.dependencies['debug'] = '~2.6.9'
	pkg.dependencies['dotenv'] = '^5.0.1'
	pkg.dependencies['express'] = '~4.16.0'
	pkg.dependencies['express-session'] = '^1.15.6'
	pkg.dependencies['express-validator'] = '^5.2.0'
	pkg.dependencies['lodash'] = '^4.17.10'
	pkg.dependencies['mongoose'] = '^5.1.0'
	pkg.dependencies['winston'] = '~2.3.1'
	pkg.dependencies['multer'] =  '^1.3.0'
	
	// Add scripts to package.json
	pkg.scripts['dev']   = "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
	pkg.scripts['start'] = "npm run build && node ./server/bin/www"
	pkg.scripts['build'] = "node build/build.js"
	
	
	// sort dependencies like npm(1)
	pkg.dependencies = sortedObject(pkg.dependencies)
	
	return pkg
}

function createFolders(dir){
	if (dir !== '.') {
		mkdir(dir, '.')
	}
	
	mkdir(dir, 'server')
	mkdir(dir, 'client')
	
	// add serverside folders, common to CTED projects
	mkdir(dir, 'server/auth')
	mkdir(dir, 'server/bin')
	mkdir(dir, 'server/config')
	mkdir(dir, 'server/controllers')
	mkdir(dir, 'server/db')
	mkdir(dir, 'server/db/create')
	mkdir(dir, 'server/helpers')
	mkdir(dir, 'server/models')
	mkdir(dir, 'server/models/mongo')
	mkdir(dir, 'server/models/pg')
	mkdir(dir, 'server/routes')
	
	// add clientside folders
	mkdir(dir, 'client/template')
	mkdir(dir, 'client/template/src')
	mkdir(dir, 'client/template/src/assets')
	mkdir(dir, 'client/template/src/assets/home-page')
	mkdir(dir, 'client/template/src/components')
	mkdir(dir, 'client/template/src/components/pieces')
	mkdir(dir, 'client/template/src/components/pages')
	mkdir(dir, 'client/template/src/router')
	mkdir(dir, 'client/template/src/global')
}

function copyFiles(dir){
	// serverside files
	copyTemplateMulti('js/auth', dir + '/server/auth', '*.js')
	copyTemplateMulti('js/config', dir + '/server/config', '*.js')
	copyTemplateMulti('js/db',     dir + '/server/db',     '*.js')
	copyTemplateMulti('js/db/create',    dir + '/server/db/create',     '*.sql')
	copyTemplateMulti('js/helpers',dir + '/server/helpers', '*.js')
	copyTemplateMulti('js/controllers', dir + '/server/controllers', '*.js')
	copyTemplateMulti('js/models/mongo', dir + '/server/models/mongo', '*.js')
	copyTemplateMulti('js/models/pg', dir + '/server/models/pg', '*.js')
	copyTemplateMulti('js/routes', dir + '/server/routes', '*.js')
	
	// clientside files
	copyTemplateMulti('client-side/src', dir + '/client/template/src', '*.*')
	copyTemplateMulti('client-side/src/assets', dir + '/client/template/src/assets', '*.*')
	copyTemplateMulti('client-side/src/assets/home-page', dir + '/client/template/src/assets/home-page', '*.*')
	copyTemplateMulti('client-side/src/components/pages', dir + '/client/template/src/components/pages', '*.vue')
	copyTemplateMulti('client-side/src/components/pieces', dir + '/client/template/src/components/pieces', '*.vue')
	copyTemplateMulti('client-side/src/router', dir + '/client/template/src/router', '*.js')
	copyTemplateMulti('client-side/src/global', dir + '/client/template/src/global', '*.js')
	
	// common
	copyTemplate('js/gitignore', path.join(dir, '/server/.gitignore'))
	copyTemplate('txt/.env', path.join(dir, '/server/.env'))
	copyTemplate('txt/README.md', dir + '/README.md')
	copyTemplate('txt/clientLinux.sh', dir + '/client/clientLinux.sh')
	copyTemplate('txt/clientMac.sh', dir + '/client/clientMac.sh')
	copyTemplate('txt/clientWindows.bat', dir + '/client/clientWindows.bat')
	//copyTemplateMulti('txt/*.sh', dir + '/client','*.sh')
}

function mountRoutes(app){
	// Auth router mount
	app.locals.localModules.authRouter = './routes/auth'
	app.locals.mounts.push({ path: '/', code: 'authRouter' })
	
	// Admin router mount
	app.locals.localModules.adminRouter = './routes/admin'
	app.locals.mounts.push({ path: '/admin', code: 'adminRouter' })
	
	// Api router mount
	app.locals.localModules.apiRouter = './routes/api'
	app.locals.mounts.push({ path: '/', code: 'apiRouter' })
}

function writeFiles(dir, app, www, pkg){
	write(path.join(dir, 'server/app.js'), app.render())
	write(path.join(dir, 'server/package.json'), JSON.stringify(pkg, null, 2) + '\n')
	write(path.join(dir, 'server/bin/www'), www.render(), MODE_0755)
}

function postInstall(dir, name){
	var prompt = launchedFromCmd() ? '>' : '$'
	
	if (dir !== '.') {
		console.log()
		console.log('   change directory:')
		console.log('     %s cd %s', prompt, dir)
	}
	
	console.log()
	console.log('   FOR NEXT STEPS: please read the README.md in the home directory of your project')
	/*console.log('   to install server-side dependencies:')
	console.log('     %s cd server', prompt)
	console.log('     %s yarn install', prompt)
	console.log()
	console.log('   to run the app:')
	
	if (launchedFromCmd()) {
		console.log('     %s SET DEBUG=%s:* & npm start', prompt, name)
	} else {
		console.log('     %s DEBUG=%s:* npm start', prompt, name)
	}
	
	console.log()
	
	
	// try to init the vue-cli in the client folder
	console.log("****** to initialize the client side using vue-cli ******")
	console.log('     %s cd client', prompt)
	console.log('     %s vue init webpack', prompt)
	
	console.log()
	console.log('   First, copy over the folder "client/template/src" into the "client" folder, (delete the existing "client/src" folder. Also delete the "client/template" folder after copying)')
	
	console.log()
	console.log('   To install dependencies,')
	console.log('     %s yarn install', prompt)
	console.log('     %s yarn add -S jquery vue bootstrap font-awesome axios vue-axios vue-agile popper.js', prompt)
	
	console.log()
	console.log('   to run the client-side app:')
	console.log('     %s npm run dev', prompt)*/
}


/**
 * Create an app name from a directory path, fitting npm naming requirements.
 *
 * @param {String} pathName
 */

function createAppName (pathName) {
	return path.basename(pathName)
	.replace(/[^A-Za-z0-9.-]+/g, '-')
	.replace(/^[-_.]+|-+$/g, '')
	.toLowerCase()
}

/**
 * Check if the given directory `dir` is empty.
 *
 * @param {String} dir
 * @param {Function} fn
 */

function emptyDirectory (dir, fn) {
	fs.readdir(dir, function (err, files) {
		if (err && err.code !== 'ENOENT') throw err
		fn(!files || !files.length)
	})
}

/**
 * Graceful exit for async STDIO
 */

function exit (code) {
	// flush output for Node.js Windows pipe bug
	// https://github.com/joyent/node/issues/6247 is just one bug example
	// https://github.com/visionmedia/mocha/issues/333 has a good discussion
	function done () {
		if (!(draining--)) _exit(code)
	}
	
	var draining = 0
	var streams = [process.stdout, process.stderr]
	
	exit.exited = true
	
	streams.forEach(function (stream) {
		// submit empty write request and wait for completion
		draining += 1
		stream.write('', done)
	})
	
	done()
}

/**
 * Determine if launched from cmd.exe
 */

function launchedFromCmd () {
	return process.platform === 'win32' &&
		process.env._ === undefined
}

/**
 * Load template file.
 */

function loadTemplate (name) {
	var contents = fs.readFileSync(path.join(__dirname, '..', 'templates', (name + '.ejs')), 'utf-8')
	var locals = Object.create(null)
	
	function render () {
		return ejs.render(contents, locals, {
			escape: util.inspect
		})
	}
	
	return {
		locals: locals,
		render: render
	}
}

/**
 * Main program.
 */

function main () {
	// Path
	var destinationPath = program.args.shift() || '.'
	
	// App name
	var appName = createAppName(path.resolve(destinationPath)) || 'hello-world'
	
	// Generate application
	emptyDirectory(destinationPath, function (empty) {
		if (empty || program.force) {
			createApplication(appName, destinationPath)
		} else {
			confirm('destination is not empty, continue? [y/N] ', function (ok) {
				if (ok) {
					process.stdin.destroy()
					createApplication(appName, destinationPath)
				} else {
					console.error('aborting')
					exit(1)
				}
			})
		}
	})
}

/**
 * Make the given dir relative to base.
 *
 * @param {string} base
 * @param {string} dir
 */

function mkdir (base, dir) {
	var loc = path.join(base, dir)
	
	console.log('   \x1b[36mcreate\x1b[0m : ' + loc + path.sep)
	mkdirp.sync(loc, MODE_0755)
}

/**
 * Generate a callback function for commander to warn about renamed option.
 *
 * @param {String} originalName
 * @param {String} newName
 */

function renamedOption (originalName, newName) {
	return function (val) {
		warning(util.format("option `%s' has been renamed to `%s'", originalName, newName))
		return val
	}
}

/**
 * Display a warning similar to how errors are displayed by commander.
 *
 * @param {String} message
 */

function warning (message) {
	console.error()
	message.split('\n').forEach(function (line) {
		console.error('  warning: %s', line)
	})
	console.error()
}

/**
 * echo str > file.
 *
 * @param {String} file
 * @param {String} str
 */

function write (file, str, mode) {
	fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
	console.log('   \x1b[36mcreate\x1b[0m : ' + file)
}
