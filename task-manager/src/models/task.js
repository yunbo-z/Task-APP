const mongoose = require("mongoose")
const validator = require('validator')

const TasksSchema = new mongoose.Schema({
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
}, {
    timestamps: true
})

const Tasks = mongoose.model('tasks', TasksSchema)

module.exports = Tasks