const express = require('express')
const { Show, User } = require('../models/index')
const router = express.Router()

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})

// Get a specific user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

// Get all shows for a specific user by ID
router.get('/users/:id/shows', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        const shows = await user.getShows()
        res.send(shows)
    } catch (error) {
        res.send(error)
    }
})
// Update a user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const { username, password } = req.body
        const updatedUser = await User.update(
            { username, password },
            { where: { id: req.params.id } }
        )
        if (updatedUser[0] === 1) {
            const user = await User.findByPk(req.params.id);
            console.log('Successfully updated user:', user);
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.send(error)
    }
})

// Create a new user
router.post('/users', async (req, res) => {
    const { username, password } = req.body
    const newUser = await User.create({ username, password })
    res.send(newUser)
})

// Link a show to a user by user ID and show ID
router.post('/users/:id/shows', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      const show = await Show.findByPk(req.body.showId)
      await user.addShow(show)
      res.send('Show linked to user successfully.')
    } catch (error) {
      res.send(error)
    }
  })
// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    const userID = req.params.id
    try {
        console.log('Deleting user with ID:', userID)
        const user = await User.findByPk(req.params.id)
        if (!user) {
            res.status(404).send('Could not find user')
        }
        await user.destroy()
        res.send({ message: 'User successfully deleted' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router