//Socket.IO
const io = require("socket.io")(3001 , {
  cors:  {
    origin: 'http://localhost:3000'
  }
});

//Chance.js
var Chance = require('chance');
var chance = new Chance();

//Array storing name of all active rooms
let activeRooms = [];

//Waiting for user to join or create a new room
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("createRoom", () => {
    createRoom(socket);
  });
  socket.on("joinRoom", (name) => {
    joinRoom(socket, name);
  });
});

//Creates a new room and adds the user
function createRoom(socket) {
  let name = getNewRoomName();
  console.log("Creating room " + name);
  joinRoom(socket, name);
  socket.emit("newRoom", name);
}

//Joins the room if it exsists, returns true if success. Also emits "joinRoomSuccess" or "joinRoomFail" to the socket
function joinRoom(socket, name) {
  console.log("Socket trying to join room " + name);
  if (activeRooms.includes(name)) {
    console.log("Success");
    socket.join(name);
    socket.emit("joinRoomSuccess", name);
  } else {
    console.log("Failed");
    socket.emit("joinRoomFail", name);
  }

  return activeRooms.includes(name);
  
}

function getNewRoomName() {
  let name = chance.word({ length: 6 });
  while (!activeRooms.includes(name)){
    name = chance.word({ length: 6 });
    activeRooms.push(name);
  }
  return name;
}