const express = require('express')
const Tasks = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    // const task = new Tasks(req.body)
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})



router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        // const tasks = await Tasks.find({ owner: req.user._id })
        await req.user.populate({
            path: 'task',
            match
        }) //??? why here after removing exec() everything works
        res.send(req.user.task)
    } catch (e) {

        res.status(500).send(req.user.task)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Tasks.findById(_id)
        const task = await Tasks.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update!' })
    }
    try {
        
        const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })
        // const task = await Tasks.findById(req.params.id)
        // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const user = await Tasks.findByIdAndDelete(req.params.id)
        const user = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router