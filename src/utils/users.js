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
    const user = { id, name, room }
    users.push(user)
    return user
}

