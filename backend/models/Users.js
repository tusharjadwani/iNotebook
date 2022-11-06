const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
})

const Users=mongoose.model('users', userSchema)
module.exports = Users