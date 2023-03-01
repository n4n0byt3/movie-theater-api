//import our db, Model, DataTypes
const { db, DataTypes } = require('./db')

//Creating a User child class from the Model parent class
const Show = db.define("shows", {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    status: DataTypes.STRING,
});

//exports
module.exports = { Show }
