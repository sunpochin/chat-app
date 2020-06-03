// client code
const socket = io()

socket.on('message', (msg) => {
    console.log('server greeted: ', msg)
})


const $messageForm = document.querySelector('#message-form');

$messageForm.addEventListener(
        'submit', (e) => {
    e.preventDefault()
    // disable
    const message = e.target.elements.message.value
    // setting up callback function, and paramter 'error': (error) => {}
    socket.emit('sendMessage', message, (error) => {
        // enable
        if (error) {
            return console.log(error)
        }
    })
    console.log('The message was delivered!')
})

document.querySelector('#send-location')
        .addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        console.log('position: ', position.coords)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }, () => {
//            console.log('Location shared.')
        })
    })
})



