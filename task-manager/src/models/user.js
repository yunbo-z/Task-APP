const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Tasks = require('./task')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'anonymous',
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Wrong Email Format')
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('The password cannot contain string "password')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must greater than 0!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//virtual property is not a data to stored in the database
//it's a relationship between entities(user and task)
UserSchema.virtual('task', {
    ref:'tasks',
    localField: '_id',
    foreignField:'owner'
})

//toJSON method runs even though we're never explicity calling this
UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//methods use on the instance and individual user
UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'helloworld')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//defines a new static method named findByCredentials on the UserSchema.
UserSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login!')
    }
    return user
}

//hash the plain text password before saving
UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//delete user tasks when user is removed
UserSchema.pre('remove', async function (next) {
    const user = this
    await Tasks.deleteMany({ owner: user_id })
    next()
})

//trim: remove leading and trailing whitespace"
const User = mongoose.model('users', UserSchema)

module.exports = User