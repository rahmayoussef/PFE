const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const MembreSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
       type: String
    },

    date: {
        type: Date,
        default: Date.now
    },

})

module.exports = Membre = mongoose.model('membres', MembreSchema )