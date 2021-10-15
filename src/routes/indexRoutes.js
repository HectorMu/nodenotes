const express = require('express')
const router = express.Router()

router.get('/',require ('../controllers/indexController').renderIndexView)



module.exports = router