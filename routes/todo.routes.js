const express = require('express')
const router = express.Router()
const todo = require('../models/todo.model')


router.get('/', async (req, res) => {
    await todo.getTodos()
    .then(todos => res.json(todos))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})


router.get('/:id', async (req, res) => {
    const id = req.params.id

    await todo.getTodo(id)
    .then(todo => res.json(todo))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})


router.post('/',  async (req, res) => {
    await todo.addTodo(req.body.todo)
    .then(todo => res.status(201).json({
        message: `The todo #${todo.id} has been created`,
        content: todo
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})


router.put('/:id', async (req, res) => {
    const id = req.params.id

    await todo.updateTodo(id, req.body.todo)
    .then(todo => res.json({
        message: `The todo #${id} has been updated`,
        content: todo
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id

    await todo.deleteTodo(id)
    .then(todo => res.json({
        message: `The todo #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router