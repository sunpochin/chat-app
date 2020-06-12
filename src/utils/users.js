const users = []

// addUser, removeUser, getUser, getUserInRoom.
const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // validate data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room }
    // console.log('User: ', user)
    users.push(user)
    return { user }
}


const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// console.log(users)
// const userRemoved = removeUser(22)
// console.log('userRemoved: ', userRemoved)
// console.log('users: ', users)


const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

addUser({
    id: 22,
    username: 'andrew',
    room: ' south philly'
})

addUser({
    id: 42,
    username: 'mike',
    room: 'south philly'
})

addUser({
    id: 32,
    username: 'andrew',
    room: 'center city'
})

const user = getUser(42)
// console.log(user)


const userList = getUsersInRoom('south philly')
// console.log(userList)


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

