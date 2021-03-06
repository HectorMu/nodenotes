const express = require('express')
const router = express.Router()
const auth = require('../lib/auth')

const authController = require('../controllers/authcontroller')

//render
router.get('/signup', auth.IsAlreadyLoggedIn, authController.renderSignUp)
router.get('/login', auth.IsAlreadyLoggedIn, authController.renderLogin)
router.get('/recover',authController.rendeRecoverStart)

//common auth actions
router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// routes for recover user password
router.post('/recover',auth.IsAlreadyLoggedIn, authController.SendRecoverEmail)
router.get('/resetpass/:token', authController.RenderRecoverView)
router.post('/resetpass/:token', authController.ChangeRecoverPass)
module.exports = router
