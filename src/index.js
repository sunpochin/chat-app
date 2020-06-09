// server code
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('new websocket connection.')

    socket.on('join', ({username, room}, callback) => {
        const { error, user} = addUser({id: socket.id, username, room})

        console.log('Error: ', error, ' User: ', user)

        if (error) {
            // return here to avoid executing following, or wrap the following with else.
            return callback(error)
        }

        socket.join(user.room)
        socket.emit('message', generateMessage('admin', 'Welcome!') )
        socket.broadcast.to(user.room).emit('message', 
            generateMessage('admin', `${user.username} has joined!`) )

        callback()  // no error.
        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit,  socket.broadcast.to.emit

    })


    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity not allowed.')
        }
        const user = getUser(socket.id)
        console.log('after getUser: ', user)
        io.to(user.room).emit('message', generateMessage(user.username, message) )
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        console.log('after getUser: ', user)
        io.to(user.room).emit('locationMessage', 
            generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}` ) )
        callback()
    })
    
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMessage('admin', `${user.username} has left.`) )
        }
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})

