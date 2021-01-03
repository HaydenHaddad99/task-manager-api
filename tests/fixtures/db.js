const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')

userOneId = new mongoose.Types.ObjectId()


const userOne = {
    _id: userOneId,
    name: "Mike Haddad",
    email: "Mike@yahoo.com",
    password: "Mike123!",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.jwt_SECRET)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase

}