require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('65c39658f57b3b3cf862a9ad', { age:4 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age:20 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})