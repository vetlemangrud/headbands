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


//Waiting for user to join or create a new room
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("createRoom", () => {
    createRoom(socket);
  });
  socket.on("joinRoom", (name) => {
    joinRoom(socket, name);
  });

  socket.on("disconnect", () => {
    socketDisconnected(socket);
  });
});

//Deletes room 
function socketDisconnected(socket) {
  console.log("a user disconnected")
}

//Creates a new room and adds the user
function createRoom(socket) {
  let name = getNewRoomName();
  console.log("Creating room " + name);
  hostRoom(socket, name);
  socket.emit("newRoom", name);
}

//Joins the room if it exsists, returns true if success. Also emits "joinRoomSuccess" or "joinRoomFail" to the socket
function joinRoom(socket, name) {
  console.log("Socket trying to join room " + name);
  if (io.of("/").adapter.rooms.has(name) && name.length == roomNameLength) {
    console.log("Success");
    socket.join(name);
    socket.emit("joinRoomSuccess", name);
  } else {
    console.log("Failed");
    socket.emit("joinRoomFail", name);
  }

  return io.of("/").adapter.rooms.has(name);
  
}

function hostRoom(socket, name) {
  socket.join(name);
  socket.emit("joinRoomSuccess", name);
}

function getNewRoomName() {
  let name = chance.word({ length: roomNameLength });
  while (io.of("/").adapter.rooms.has(name)){
    name = chance.word({ length: roomNameLength });
  }
  return name;
}