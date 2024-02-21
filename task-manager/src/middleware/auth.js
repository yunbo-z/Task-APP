const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'helloworld')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        // console.log('user: '+ user)
        // console.log('token: '+ token)


        next()
    } catch (e) {
        res.status(400).send({ error: 'Please Authenticate' })
    }
}

module.exports = auth