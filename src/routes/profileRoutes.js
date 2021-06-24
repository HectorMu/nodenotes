const express = require('express')
const router = express.Router()
const auth = require('../lib/auth')

const profileController = require('../controllers/profileController')


router.get('/profile', auth.isLoggedIn, profileController.GetNotes)
router.get('/editprofile/:iduser',auth.isLoggedIn, profileController.renderEditProfile)
router.post('/editprofile', auth.isLoggedIn,profileController.editProfile)
router.post('/changepass',auth.isLoggedIn, profileController.changePassword)

module.exports = router