// client code
const socket = io()

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');

const $sendLocation = document.querySelector('#send-location');

const $messages = document.querySelector('#messages')
// templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const urlTemplate = document.querySelector('#url-template').innerHTML

socket.on('message', (msg) => {
    console.log('server greeted: ', msg)
    const html = Mustache.render(messageTemplate, {
        msg
    })
    console.log('html: ', html)
    $messages.insertAdjacentHTML('beforeend', html)
})


socket.on('locationMessage', (url) => {
    console.log('url: ', url)
    const html = Mustache.render(urlTemplate, {
        url
    })
    $messages.insertAdjacentHTML('beforeend', html)
})


$messageForm.addEventListener(
        'submit', (e) => {
    e.preventDefault()

    // disable
    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value
    // setting up callback function, and paramter 'error': (error) => {}
    socket.emit('sendMessage', message, (error) => {
        // enable
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
    })
    console.log('The message was delivered!')
})

$sendLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by your browser')
    }

    // disable
    $sendLocation.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        console.log('position: ', position.coords)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }, () => {
            // enable
            $sendLocation.removeAttribute('disabled')

//            console.log('Location shared.')
        })
    })
})



