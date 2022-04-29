const router = require('express').Router();
const storage = require('../db/storage.js');

router.get('/notes', (req,res) => {
    storage
    .getNotes()
    .then((notes) => {
        return res.json(notes);
    }).catch((err) => res.status(500).json(err))

})

router.post('/notes', (req,res) => {
    storage
    .addNote(req.body)
    .then((note) => {
        return res.json(note);
    }).catch((err) => res.status(500).json(err))

})

// router.delete (req.params.id)

module.exports = router;