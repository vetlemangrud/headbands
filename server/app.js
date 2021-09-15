//Socket.IO
const io = require("socket.io")(3001 , {
  cors:  {
    origin: 'http://localhost:3000'
  }
});

//Chance.js
const Chance = require('chance');
const chance = new Chance();
const roomroomLength = 6;
const nameMap = new Map();
const hostMap = new Map();

//Waiting for user to join or create a new room
io.on('connection', (socket) => {
  console.log('a user connected');
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

  socket.on("disconnect", () => {
    socketDisconnected(socket);
  });

});

io.of("/").adapter.on("delete-room", (room) => {
  hostMap.delete(room);
});
//Deletes room 
function socketDisconnected(socket) {
  nameMap.delete(socket.id);
  console.log("a user disconnected")
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
  if ((io.of("/").adapter.rooms.has(room) && room.length == roomroomLength) || host) {
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
  let room = chance.word({ length: roomroomLength });
  while (io.of("/").adapter.rooms.has(room)){
    room = chance.word({ length: roomroomLength });
  }
  return room;
}

function sendUpdatedRoomMembers(room) {
  console.log(room);
  let membersSet = io.sockets.adapter.rooms.get(room)
  let memberNames = [...membersSet].map(id => {
    return nameMap.get(id);
  });
  console.log(membersSet);
  io.to(room).emit("roomMemberUpdate", memberNames)
}

function startGame(socket, room){
  console.log("Hello");
}