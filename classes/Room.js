class Room{
    constructor(roomId, roomTitle, namespace, privateRoom = false) {
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.namespace = namespace;
        this.history = []
    }

    addmessage(message) {
        this.history.push(message);
    }

    clearMessage() {
        this.history = []
    }
}

module.exports = Room;