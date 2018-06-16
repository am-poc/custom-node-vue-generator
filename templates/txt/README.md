This web app is generated using the Custom Express App Generator. 
The GitHub repo is at: https://github.com/afshanaman81/custom-node-vue-generator 
This custom generator creates a template project with two parts:
1. Server
2. Client

It uses the cted custom cli to generate the server side.

	Next Steps For the server-side:
	1. Change directory to 'yourprojectname/server'
		> cd server
	2. Install server-side dependencies:
		> yarn install
	3. Create a PostGres Database
	4. Assign the name of the new database, and Password to the 'PG_DB' in the .env file.
	5. Run the sql scripts from the 'server/db/create' folder in the order they are numbered (2 and 3 initially only)


It uses the vue-cli to generate the client side.

	Pre-requisites
	You will need to have the 'vue-cli' npm package installed globally on your system.
	If you dont already have it, or the 'vue init' command doesnt work, install the vue-cli as follows:
		> npm install -g -S vue-cli

	Next Steps For the client-side:
	1. Change directory to 'client' using the 'cd' command
	2. In the 'client' folder, initialize a vue template using:
		> vue init webpack

		choose the following options, when asked:
			? Generate project in current directory? Yes
			? Project name client
			? Project description "any description you want"
			? Author (as you wish)
			? Vue build standalone
			? Install vue-router? Yes
			? Use ESLint to lint your code? No
			? Set up unit tests (No, or as you wish)
			? Setup e2e tests with Nightwatch? (No, or as you wish)
			? Should we run `npm install` for you after the project has been created? (recommended) npm

	3. Install client-side dependencies (make sure to be in 'client' folder)
		> npm install
	4. run the client-xxx from the 'client' folder location (there is a different file for each OS)
		> client-windows.bat


	5. Include the following line in the 'client/build/webpack.base.conf.js' on line 2
		const webpack = require('webpack')
	6. Include the following block in the 'client/build/webpack.base.conf.js' after the last entry of the object 'module.exports = { ... }' (make sure you put a comma separating the two blocks)

		plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery',
                Popper: ['popper.js', 'default'],
                Util: "exports-loader?Util!bootstrap/js/dist/util",
                Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            })
        ]

	7. to run the client-side app, type in the 'client' directory:
		> npm run dev
