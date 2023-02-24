const express = require('express')
const { Show } = require('../models/Show')
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
.put(async (req, res) => {
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
})

module.exports = router;