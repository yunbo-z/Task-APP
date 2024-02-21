require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('65c246f5cf3514c2e2d2defb').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ conpleted: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const deleteTask = await Task.findByIdAndDelete(id)
    const countTasks = await Task.countDocuments({ completed: false })
    return countTasks
}

deleteTaskAndCount('65c24728047f54cfa7855ac7').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})