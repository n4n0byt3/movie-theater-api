const { Show } = require('./Show')
const { User } = require('./User')

Show.belongsToMany(User, {through: 'users.shows'})
User.belongsToMany(Show, {through: 'users.shows'})

module.exports = {Show, User}
