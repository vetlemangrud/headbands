//Socket.IO
const io = require("socket.io")(3001 , {
  cors:  {
    origin: 'http://localhost:3000'
  }
});

//Chance.js
const Chance = require('chance');
const chance = new Chance();
const roomNameLength = 6;
const nameMap = new Map();
const hostMap = new Map();
const characterMap = new Map();

//Waiting for user to join or create a new room
io.on('connection', (socket) => {
  socket.on("createRoom", (name) => {
    nameMap.set(socket.id, name);
    createRoom(socket);
  });

  socket.on("joinRoom", (room, name) => {
    nameMap.set(socket.id, name);
    joinRoom(socket, room);
  });

  socket.on("startGame", room => {
    startGame(socket, room);
  });

  socket.on("ready", (room, character) => {
    ready(socket, room, character);
  })

  socket.on("disconnecting", () => {
    socketDisconnecting(socket);
  });

  socket.on("disconnect", () => {
    socketDisconnected(socket);
  });

});

io.of("/").adapter.on("delete-room", (room) => {
  hostMap.delete(room);
});
//Deletes data associated with socket
function socketDisconnected(socket) {
  nameMap.delete(socket.id);
  characterMap.delete(socket.id);
}
//Removes from joined rooms and sends update
function socketDisconnecting(socket){
  socket.rooms.forEach(room => {
    if (room.length == roomNameLength) {
      socket.leave(room);
      sendUpdatedRoomMembers(room);
    }
  });
}

//Creates a new room and adds the user
function createRoom(socket) {
  let room = getNewRoomName();
  console.log("Creating room " + room);
  joinRoom(socket, room, true);
  hostMap.set(room, socket.id);
  socket.emit("newRoom", room);
}

//Joins the room if it exsists, returns true if success. Also emits "joinRoomSuccess" or "joinRoomFail" to the socket
function joinRoom(socket, room, host = false) {
  console.log("Socket trying to join room " + room);
  if ((io.of("/").adapter.rooms.has(room) && room.length == roomNameLength) || host) {
    console.log("Success");
    socket.join(room);
    sendUpdatedRoomMembers(room)
    socket.emit("joinRoomSuccess", room);
    if (host) {
      socket.emit("host");
    }
  } else {
    console.log("Failed");
    socket.emit("joinRoomFail", room);
  }

  return io.of("/").adapter.rooms.has(room);
  
}

function getNewRoomName() {
  let room = chance.word({ length: roomNameLength });
  while (io.of("/").adapter.rooms.has(room)){
    room = chance.word({ length: roomNameLength });
  }
  return room;
}

function sendUpdatedRoomMembers(room) {
  let membersSet = io.sockets.adapter.rooms.get(room);
  if (!membersSet) {
    return;
  }
  let members = [...membersSet].map(id => {
    return [nameMap.get(id), characterMap.has(id)];
  });
  io.to(room).emit("roomMemberUpdate", members); 
}

async function startGame(socket, room){
  if (hostMap.get(room) == socket.id && characterMap.size == nameMap.size) {
    let sockets = await io.in(room).fetchSockets();
    sockets = chance.shuffle(sockets);
    for (let i = 0; i < sockets.length; i++) {
      const characters = [];
      for (let j = 0; j < sockets.length; j++) {
        if(i != j){
          characters.push([nameMap.get(sockets[j].id), characterMap.get(sockets[(j + 1) % sockets.length].id)]);
        }
        
      }
      sockets[i].emit("gameStarted", characters);
      
    }
  }
  
}

function ready(socket, room, character) {
  characterMap.set(socket.id, character);
  sendUpdatedRoomMembers(room);
}