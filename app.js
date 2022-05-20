const ws = require('nodejs-websocket')
const PORT = 3000

const TYPE_ENTERED = 0
const TYPE_LEAGVE = 1
const TYPE_NORMAL = 2

// create a server
let count = 0; // 
const server = ws.createServer(connect => {
    console.log('New User Connected')
    count++
    connect.userName = 'User${count}'
    // broadcast to other users
    broadcast({
        type: TYPE_ENTERED,
        msg: '${connection.userName} Entered',
        time: new Date().tolocalTimeString()
    })

    connect.on('text', data => {
        console.log('Message Receive', data)
        broadcast( {
           type: TYPE_NORMAL,
           msg: data,
           time: new Date().tolocalTimeString()
       })
    })

    // close if activated
    connect.on('close', () => {
        console.log('connection lost')
        count--
        broadcast( {
            type: TYPE_LEAGVE,
            msg: '${connection.userName} left',
            time: new Date().tolocalTimeString()
        })
    })

    // solve error
    connect.on(error => {
        console.log('connection lost')
    })
})

// broadcast
function broadcast(msg) {
    server.connections.forEach(item => {
        item.send(JSON.stringify(msg))
    })
}

server.listen(PORT, () => {
    console.log('websocket boot successfully')
})