const mongoose = require("mongoose")

const url = 'mongodb://root:your_own_password@127.0.0.1:27017/task-manager-api?authSource=admin'
mongoose.connect(url).catch((err) => console.log(err))

