const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');
const { body, validationResult } = require('express-validator');

const sec = process.env.JWT;
//crete note api
router.post('/addnote', authentication, [
    body('title', 'min 3').isLength({ min: 3 }),
    body('description', 'min 5').isLength({ min: 5 })
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors })
        }
        else {
            const { title, description, tag } = req.body

            const note = await Notes.create({ title, description, tag, user: req.id })
            res.json({ success: true, note })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: 'internal error' })
    }
})

//fetch notes api
router.get('/fetchnotes', authentication, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.id })
        res.json({ success: true, notes })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: 'internal error' })
    }
})

//update note api
router.put('/updatenote/:id', authentication, [
    body('title', 'min 3').isLength({ min: 3 }),
    body('description', 'min 5').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors });
        }
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).json({ success: false, error: 'invalid id' })
        }
        if (req.id !== note.user.toString()) {
            return res.status(400).json({ success: false, error: 'invalid id' })
        }
        note = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, note })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: 'internal error' })
    }
})

//delete note api
router.delete('/deletenote/:id', authentication, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).json({ success: false, error: 'invalid id' })
        }
        if (req.id !== note.user.toString()) {
            return res.status(400).json({ success: false, error: 'invalid id' })
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ success: true, note });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: 'internal error' })
    }
})

module.exports = router;