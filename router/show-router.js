const express = require('express')
const { Show, User } = require('../models/index')
const router = express.Router()

router.route('/shows')
.get(async (req, res) => {
    try {
        let shows = await Show.findAll()
        res.send(shows)
    } catch (error) {
        res.send(error)
    }
} )
.post( async (req, res) => {
    const { title, genre, rating, status} = req.body
    const newShow = await Show.create({
        title, 
        genre,
        rating,
        status
    })
    res.send(newShow)
})

router.route('/shows/:id')
.get( async (req, res) => {
    try {
        let show = await Show.findByPk(req.params.id)
        res.send(show)
    } catch (error) {
        res.status(404).send('No show found')
    }
})
router.put('/show-router/:show', async (req, res) => {
    try {
        const { title, genre, rating, status} = req.body
        const updatedShow = await Show.update({
            title,
            genre,
            rating,
            status
        },{
            where: {id: request.params.id}
        })
            res.send('Updated user')
            if (updatedShow[0] === 1) {
                const updatedShow = await Show.findByPk(req.params.id);
                console.log('Successfully updated Show: ', updatedShow);
                res.json(updatedShow);
            } else {
                res.status(404).json({ error: 'Show not found' });
                }
    } catch (error) {

    }
})
router.delete('/shows/:id', async (req, res) => {
    const showID = req.params.id;
    try {
        console.log('Deleting show with id', showID);
        let show = await Show.findByPk(req.params.id)
        if(!show) {
            res.status(404).send('Could not find show')
        }
        await show.destroy()
        res.send({message: 'Show successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})
router.get('/shows/:genre', async (req, res) => {
    try {
        let show = await Show.findByPk(req.params.genre)
        res.send(show)
    } catch (error) {
        res.status(404).send('Show not found')
    }
})
module.exports = router;