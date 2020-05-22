const uuidv1 = require('uuid/v1')
const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: String,
    login: String,
    age: Number
})

const users = mongoose.model('users', userSchema);
const get = (id) => {
    const usersFound = users.filter((user) => user.id === id)
    return usersFound.length >= 1 ?
        usersFound[0] :
        undefined
}

const getAll = () => {
    return users
}

const add = (user) => {
    const newUser = {
        ...user,
        id: uuidv1()
    }
    if (validateUser(newUser)) {
        users.push(newUser)
    } else {
        throw new Error('user.not.valid')
    }
    return newUser
}

const update = (id, newUserProperties) => {
    const usersFound = users.filter((user) => user.id === id)

    if (usersFound.length === 1) {
        const oldUser = usersFound[0]

        const newUser = {
            ...oldUser,
            ...newUserProperties
        }

        // Control data to patch
        if (validateUser(newUser)) {
            Object.assign(oldUser, newUser)
        } else {
            throw new Error('user.not.valid')
        }
    } else {
        throw new Error('user.not.found')
    }
}

const remove = (id) => {
    const indexFound = users.findIndex((user) => user.id === id)
    if (indexFound > -1) {
        users.splice(indexFound, 1)
    } else {
        throw new Error('user.not.found')
    }
}

function validateUser(user) {
    let result = true
    if (user && user.id && user.login && user.name) {
        result = true
    }
    return result
}

exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove
module.exports = mongoose.model("modelUsers", userSchema)