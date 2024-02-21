const mongoose = require("mongoose")
const validator = require('validator')

const Tasks = mongoose.model('tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'//to create a relationship with users models
    }
})

module.exports = Tasks