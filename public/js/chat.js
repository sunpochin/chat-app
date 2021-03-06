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
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// options
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true})

const autoscroll = () => {
    // new message element
    const $newMessage = $messages.lastElementChild

    // height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // console.log('newMessageStyles: ', newMessageStyles)
    console.log('newMessageHeight: ', newMessageHeight)

    // visible height
    const visibleHeight = $messages.offsetHeight
    console.log('visibleHeight: ', visibleHeight)

    // height of messages container
    const containerHeight = $messages.scrollHeight
    console.log('containerHeight: ', containerHeight)

    // how far has I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight
    console.log('scrollOffset: ', scrollOffset)

    console.log('containerHeight - newMessageHeight: ', containerHeight - newMessageHeight)
    console.log('scrollOffset: ', scrollOffset)

    if (containerHeight - newMessageHeight <= scrollOffset) {
        console.log('<= scrollOffset: ')
        $messages.scrollTop = $messages.scrollHeight
    }


}



socket.on('message', (obj) => {
    console.log('server greeted: ', obj)
    const html = Mustache.render(messageTemplate, {
        username: obj.username,
        msg: obj.text,
        createAt: moment(obj.createAt).format('h:mm:ss a') 
    })
    // console.log('html: ', html)
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('locationMessage', (obj) => {
    console.log('url obj: ', obj)
    const html = Mustache.render(urlTemplate, {
        username: obj.username,
        url: obj.url,
        createAt: moment(obj.createAt).format('h:mm:ss a') 
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})


socket.on('roomData', ({ room, users }) => {
    console.log(room)
    console.log('roomData: ', users)
    const html = Mustache.render(sidebarTemplate, {
        room: room,
        users: users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
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


socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})
