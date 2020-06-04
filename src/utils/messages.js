
const generateMessage = (text) => {
    const themsg = {
        text: text,
        createAt: new Date().getTime()
    }
    return themsg
}

module.exports = {
    generateMessage
}

