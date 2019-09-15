function joinNs(endpoint) {
    if(socket2) {
        // check if there is a socket connection and close it
        socket2.close()
        // also remove the form event listener
        document.querySelector('.message-form').removeEventListener('submit', formSubmit);
    }
   socket2 = io(`http://localhost:9000${endpoint}`)
    socket2.on('nRoomLoad', (nRooms) =>{
        console.log(nRooms);
        const roomList = document.querySelector('.room-list');
        roomList.innerHTML = '';
        nRooms.forEach(room =>{
            // console.log(room)
            let glyph;
            room.privateRoom ? glyph= 'glyphicon-lock' : glyph= "glyphicon-globe"
            roomList.innerHTML += `<li class='room'><span class="glyphicon ${glyph}">${room.roomTitle}</span></li>`
        })
        const liRoomList = document.querySelectorAll('.room');
        liRoomList.forEach(elem => {
            elem.addEventListener('click', (e) =>{
                console.log(e.target.innerText)
                joinRoom(e.target.innerText)
            })
        })
        const topRoom = document.querySelector('.room');
        const topRoomName = topRoom.innerText;
        // console.log(topRoomName);
        joinRoom(topRoomName);
    });

    socket2.on('messageToClients', (msg) =>{
        console.log(msg);
        document.querySelector('#messages').innerHTML += htmlBuilder(msg);
    });

    document.querySelector('.message-form').addEventListener('submit', formSubmit);
}

function formSubmit(e){
    e.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket2.emit('newMessageToServer', {text: newMessage});
}


function htmlBuilder(msg) {
    const date = new Date(msg.time).toLocaleString()
    return(`
    <li>
        <div class="user-image">
            <img src=${msg.avater} />
        </div>
        <div class="user-message">
            <div class="user-name-time">${msg.username} <span>${date}</span></div>
            <div class="message-text">${msg.text}</div>
        </div>
    </li>
    `);
}