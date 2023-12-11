const messages = [];

function addMessage(sender, text) {
    const newMessage = {
        sender,
        text,
    };
    messages.push(newMessage);
}

function getMessages() {
    return messages;
}


function sendMessage(sender, message) {
    addMessage(sender, message);
}

module.exports = {
    addMessage,
    getMessages,
    sendMessage,
};
