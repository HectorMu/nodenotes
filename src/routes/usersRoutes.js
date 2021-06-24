const express = require('express')
const router = express.Router()
const auth = require('../lib/auth')

const usersController = require ('../controllers/usersController')

router.get('/users', auth.isLoggedIn, usersController.listUsers)
router.post('/adduser', auth.isLoggedIn, usersController.addUser)
router.get('/edituser/:iduser',auth.isLoggedIn, usersController.rendereditUser)
router.post('/edituser/:iduser', auth.isLoggedIn, usersController.editUser)
router.get('/deleteuser/:iduser',auth.isLoggedIn, usersController.deleteUser)
router.post('/usersearch/', auth.isLoggedIn, usersController.searchUser)

module.exports = router