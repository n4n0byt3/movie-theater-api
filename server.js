const express = require('express')
const app = express()
const {sequelize}  = require('./models/db')
const port = 3000
const showRouter = require('./router/show-router')

app.use(express.json())

app.use(showRouter)

app.listen(port, () =>{
    sequelize.sync()
    console.log(`Listening on port ${port}`)
})