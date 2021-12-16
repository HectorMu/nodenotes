const express = require('express')
const router = express.Router();

router.get('/api/verifyEmail/:email', require('../controllers/apiController').verifyExistingEmail)
router.get('/api/getUserNotes',require('../controllers/apiController').getUserNotes)

module.exports = router
