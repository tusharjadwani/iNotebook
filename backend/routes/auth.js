const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
// const sec=process.env.JWT_SEC;
const sec = "pokemon"

//create user api
router.post('/createuser', [
    body('email', 'enter valid email').isEmail(),
    body('name', 'minimum 3 words').isLength({ min: 3 }),
    body('password', 'minimum 5 words').isLength({ min: 5 })

], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors })
        }
        else {
            //email unique
            const user = await Users.find({ email: req.body.email });

            if (user.length !== 0) {
                return res.status(400).json({ success: false, error: 'email already registered' })
            }
            else {
                const { email, name, password } = req.body

                //bcrypt password
                const salt = await bcrypt.genSalt(10);
                const securePass = await bcrypt.hash(password, salt);
                const user = await Users.create({ email, name, password: securePass });
                const token = jwt.sign({ id: user.id }, sec)
                res.json({ success: true, token });
            }
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: 'internal error occured' })
    }


})

//login api
router.post('/login', [
    body('email', 'enter valid email').isEmail(),
    body('password', 'enter valid password').isLength({ min: 5 })
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors });
        }
        else {

            const user = await Users.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).json({ success: false, error: 'invalid creden' });
            }
            const pass = await bcrypt.compare(req.body.password, user.password)

            if (!pass) {
                return res.status(400).json({ success: false, error: 'invalid creden' });
            }
            const token = jwt.sign({ id: user.id }, sec)
            res.json({ success: true, token })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: 'internal error' });
    }
})

module.exports = router