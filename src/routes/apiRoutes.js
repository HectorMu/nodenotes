const express = require('express')
const router = express.Router();
 
router.get('/api/getUsers', require('../controllers/apiController').getAllRegisteredUsers)

module.exports = router
