// client code
const socket = io()

socket.on('message', (msg) => {
    console.log('server greeted: ', msg)
})


document.querySelector('#message-form').addEventListener(
        'submit', (e) => {
    e.preventDefault()
//    const message = document.querySelector('input').value
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message)
    
    // console.log('Clicked!!')
    // socket.emit('client')
})

// document.querySelector('#connect').addEventListener('click', () => {
//     console.log('Clicked!!')
//     socket.emit('client')
// })


