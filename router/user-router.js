const express = require('express')
const { Show, User } = require('../models/index')
const { route } = require('./show-router')
const router = express.Router()



router.get('/users', async (req, res) => {
    try {
        let users = await User.findAll()
        res.send(users)
    } catch (error) {
        res.send(error)
    }
} )

router.get('/users/:id', async (req, res) => {
    try {
        let users = await User.findByPk(req.params.id)
        res.send(users)
    } catch (error) {
        res.send(error)
    }
} )

router.get('/users/:id/shows', async (req, res) => {
    try {
        const fetchedUser = await User.reload(req.params.id)
        
        let show = await fetchedUser.getShows()
        res.send(show)
    } catch (error) {
        res.send(error)
    }
} )

function test () {
    
        try {
            const fetchedUser = User.reload()
            
            let show = fetchedUser.getShows()
            return(show)
        } catch (error) {
            return(error)
        }
    } 
    console.log(test())

router.put('/:id', async (req, res) => {
    try {
        const { username, password } = req.body
        const updatedUser = await User.update({
            username,
            password
        },{
            where: {id: request.params.id}
        })
            res.send('Updated user')
            if (updatedUser[0] === 1) {
                const updatedUser = await User.findByPk(req.params.id);
                console.log('Successfully updated User: ', updatedUser);
                res.json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
                }
    } catch (error) {

    }
})

router.post('/users', async (req, res) => {
    const { username, password} = req.body
    const newUser = await User.create({
        username,
        password
    })
    res.send(newUser)
})

router.delete('/users/:id', async (req, res) => {
    const userID = req.params.id;
    try {
        console.log('Deleting user with id', userID);
        let user = await User.findByPk(req.params.id)
        if(!user) {
            res.status(404).send('Could not find user')
        }
        await user.destroy()
        res.send({message: 'User successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})


module.exports = router
