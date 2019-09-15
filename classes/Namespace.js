class Namespace {
    constructor(id, title, image, endpoint,rooms) {
        this.id = id;
        this.title = title;
        this.rooms = rooms;
        this.endpoint = endpoint;
        this.image = image;
        this.rooms = []
    }

    addRoom(roomObj) {
        this.rooms.push(roomObj);
    }
}

module.exports = Namespace;