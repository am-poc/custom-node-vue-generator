const express           = require('express')
const passportConfig    = require('../auth/token-based')
const adminCtrl         = require('../controllers/adminController')
const router              = new express.Router()


//const roles             = require("../helpers/rolesAndPermissions/rolesAndPermissionsMiddleWare")
/* GET Admin home page. */
//router.post('/users/add', [passportConfig.authorizeRoute, roles.checkPermissions], adminCtrl.addNewUser)
//router.post('/users/edit', [passportConfig.authorizeRoute, roles.checkPermissions], adminCtrl.updateUserPassword)

router.post('/add/user', passportConfig.authorizeRoute, adminCtrl.addNewUser)
router.get('/view/users', passportConfig.authorizeRoute, adminCtrl.viewAllUsers)


router.post('/add/session', passportConfig.authorizeRoute, adminCtrl.addNewSession)
router.get('/view/sessions', passportConfig.authorizeRoute, adminCtrl.viewAllSessions)

router.get('/search', passportConfig.authorizeRoute, adminCtrl.search)

module.exports = router;
