const express = require('express')
const router = express.Router()
const auth = require('../lib/auth')

const notesController = require ('../controllers/notesController')

router.get('/mynotes', auth.isLoggedIn, notesController.listNotes)
router.get('/mynotes/normal', auth.isLoggedIn, notesController.listNormalNotes)
router.get('/mynotes/important', auth.isLoggedIn, notesController.listImportantNotes)
router.get('/mynotes/veryimportant', auth.isLoggedIn, notesController.listVeryImportantNotes)
router.post('/savenote', auth.isLoggedIn, notesController.saveNote)
router.post('/editnote/:idnote', auth.isLoggedIn, notesController.editNote)
router.get('/deletenote/:idnote/:title', auth.isLoggedIn, notesController.deleteNote)
router.post('/notesearch/', auth.isLoggedIn, notesController.searchNote)
 
module.exports = router
