// console.log('hello')
const username = prompt('what is ur name')
const socket = io('http://localhost:9000',{
    query: {
        username
    }
});
let socket2 = '';

socket.on('connect', (msg) =>{
    // console.log('hello')
})

socket.on('nslist', (nsData) => {
    let namespaces = document.querySelector('.namespaces');
    nsData.forEach(data => {
        namespaces.innerHTML += `<div class='namespace' ns=${data.endpoint}> <img src=${data.image} alt=${data.endpoint}</div>`
    });
    
    document.querySelectorAll('.namespace').forEach(item =>{
        item.addEventListener('click', (e)=>{
            const endpoint = item.getAttribute('ns')
            console.log(endpoint);
            joinNs(endpoint)
        })
    })
});

