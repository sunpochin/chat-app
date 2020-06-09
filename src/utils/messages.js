

const generateMessage = (username, text) => {
    const themsg = {
        username: username,
        text: text,
        createAt: new Date().getTime()
    }
    return themsg
}

const generateLocationMessage = (username, url) => {
    const themsg = {
        username: username,
        url: url,
        createAt: new Date().getTime()
    }
    return themsg
}

module.exports = {
    generateMessage,
    generateLocationMessage
}

