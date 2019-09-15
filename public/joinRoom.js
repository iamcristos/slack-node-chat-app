function joinRoom(roomName) {
    // send room name to the server
    socket2.emit('joinRoom', roomName,(numberOfpeople) =>{
        // console.log(roomName);
        document.querySelector('.curr-room-num-users').innerHTML = `${numberOfpeople} <span class="glyphicon glyphicon-user"></span>`
    });
    socket2.on('chatHistory', (msg) => {
        const messageUl = document.querySelector('#messages');
        const current = messageUl.innerHTML = '';
        msg.forEach(message =>{
            messageUl.innerHTML = current + htmlBuilder(message);
        });
        // messageUl.scrollTo(0, messageUl.scrollHeight);
    });
    socket2.on('numberOfPeople', (number) =>{
        // console.log(number)
        document.querySelector('.curr-room-text').innerText = `${number}`;
    });
    let search = document.querySelector('#search-box');
    const messages = document.querySelectorAll('.message-text');
    search.addEventListener('input', (e) =>{
        messages.forEach(text =>{
            if(text.innerText.lowerCase().indexOf(e.target.value.lowerCase()) === -1 ) {
                text.style.display = 'none';
            }else {
                text.style.display = 'block';
            }
        })
    })
}