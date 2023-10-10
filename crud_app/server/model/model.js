//criar um schema

const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    name: {                                                             
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, //obrigatorio
        unique: true //string unica
    },
    gender: String,
    status: String
})

const userdb = mongoose.model('userdb', schema)

module.exports = userdb