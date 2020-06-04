

const generateMessage = (text) => {
    const themsg = {
        text: text,
        createAt: new Date().getTime()
    }
    return themsg
}

const generateLocationMessage = (url) => {
    const themsg = {
        url: url,
        createAt: new Date().getTime()
    }
    return themsg
}

module.exports = {
    generateMessage,
    generateLocationMessage
}

