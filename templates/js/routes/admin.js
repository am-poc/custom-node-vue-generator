const express           = require('express')
const passportConfig    = require('../auth/token-based')
const adminCtrl         = require('../controllers/adminController')
const router              = new express.Router()

//const roles             = require("../helpers/rolesAndPermissions/rolesAndPermissionsMiddleWare")
/* GET Admin home page. */
//router.post('/users/add', [passportConfig.authorizeRoute, roles.checkPermissions], adminCtrl.addNewUser)
//router.post('/users/edit', [passportConfig.authorizeRoute, roles.checkPermissions], adminCtrl.updateUserPassword)

router.get('/view/all-maps',passportConfig.authorizeRoute, adminCtrl.getAuthorizedMaps)
router.get('/view/all-features', passportConfig.authorizeRoute, adminCtrl.viewAllSessions)
router.get('/view/all-geojson-files', passportConfig.authorizeRoute, adminCtrl.getUploadedFiles)
router.get('/view/all-users', passportConfig.authorizeRoute, adminCtrl.getAllUsers)

router.get('/map/edit/:slug', passportConfig.authorizeRoute, adminCtrl.getMapData)


router.post('/add/user', passportConfig.authorizeRoute, adminCtrl.addNewUser)
router.post('/add/session', passportConfig.authorizeRoute, adminCtrl.addNewSession)


router.get('/search', passportConfig.authorizeRoute, adminCtrl.search)
router.post('/upload', passportConfig.authorizeRoute, adminCtrl.upload)



module.exports = router;
