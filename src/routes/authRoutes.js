const express = require('express')
const router = express.Router()
const auth = require('../lib/auth')

const authController = require('../controllers/authcontroller')


//common auth actions
router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// routes for recover user password
router.post('/recover', authController.SendRecoverEmail)
router.get('/resetpass/:iduser/:token', authController.RenderRecoverView)
router.post('/resetpass/:iduser/:token', authController.ChangeRecoverPass)
module.exports = router
