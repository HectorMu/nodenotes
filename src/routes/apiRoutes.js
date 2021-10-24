const express = require('express')
const router = express.Router();

router.get('/api/verifyEmail/:email', require('../controllers/apiController').verifyExistingEmail)

module.exports = router
