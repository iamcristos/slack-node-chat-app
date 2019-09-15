const express = require('express');
const socketIO = require('socket.io');
const namespace = require('./data/namespaces');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
    res.send('Hello')
})
const PORT = process.env.PORT || 9000
const server = app.listen(PORT);

const io = socketIO(server);

io.on('connection', (sockect)=>{
    const ns = namespace.map(ns => {
        return {
            endpoint: ns.endpoint,
            image: ns.image
        }
    });
    sockect.emit('nslist', ns);
})


namespace.forEach(endpoint=>{
    io.of(endpoint.endpoint).on('connection', (sockect) =>{
        // console.log(`${sockect.id} is connected to ${endpoint.endpoint}`)
        const username = sockect.handshake.query.username
        sockect.emit('nRoomLoad', endpoint.rooms);
        sockect.on('joinRoom', (room, numberOfUsersCallback) =>{
            // console.log(room);
            // deal with history later
            // io.of('/wiki').in(room).clients((err, client) =>{
            //     // console.log(client)
            //     numberOfUsersCallback(client.length);
            // })
            // console.log(endpoint.rooms, 'hello there', room);
            
            const userRoom = Object.keys(sockect.rooms)[1];
            sockect.leave(userRoom);
            // console.log(sockect.rooms);
            rommNumber(endpoint, room, sockect)
            sockect.join(room);
            const nsRoomHistory = endpoint.rooms.find(rooms =>{
                // console.log(room)
                return rooms.roomTitle === room
            });
            // console.log(nsRoomHistory)
            sockect.emit('chatHistory', nsRoomHistory.history);
            rommNumber(endpoint, room, sockect)
        });
        sockect.on('newMessageToServer', (msg) => {
            // console.log(msg)
            const fullMsg = {
                text:msg.text,
                username,
                time: Date.now(),
                avater: 'https://via.placeholder.com/30'
            }
            // get the room the person belongs too...
            // console.log(sockect.rooms)
            // the room will always be the second item on the object
            const userRoom = Object.keys(sockect.rooms)[1];
            const nsRoomHistory = endpoint.rooms.find(room =>{
                return room.roomTitle === userRoom
            });
            nsRoomHistory.addmessage(fullMsg)
            io.of(endpoint.endpoint).to(userRoom).emit('messageToClients', fullMsg)
        });
    })
})

function rommNumber(endpoint, room, sockect) {
    io.of(endpoint.endpoint).in(room).clients((err, client) =>{
        // console.log(client)
        // numberOfUsersCallback(client.length);
        sockect.emit('numberOfPeople', client.length);
    })
}