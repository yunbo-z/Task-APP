const express = require('express')
require('./db/mongoose')
const userRouter = require('../src/routers/user')
const taskRouter = require('../src/routers/task')

const app = express()
const port = process.env.PORT || 3000


//middleware
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('Get request is disabled!')
//     } else {
//         next()
//     }
// })

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.endsWith('.pdf')) {
            return cb(new Error('please upload a PDF'))
        }

        cb(undefined, true)
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.use(express.json()) // converting the JSON data in the request body into JavaScript objects
app.use(userRouter)
app.use(taskRouter)




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('65d3a2345f8ef60ff5a6e7bf').populate("owner").exec()
//     // console.log(task)
//     const user = await User.findById('65d5fe5d71e5e587ef4fcea2').populate("task").exec()
//     console.log(user.task)
// }
// main()

