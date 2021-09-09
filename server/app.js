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

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("createRoom", () => {
    createRoom(socket);
  });
  socket.on("joinRoom", (name) => {
    joinRoom(socket, name);
  });
});

function createRoom(socket) {
  let name = getNewRoomName();
  console.log("Creating room " + name);
  socket.emit("newRoom", name)
}

function joinRoom(socket, name) {
  console.log("Socket joining " + name);
}

function getNewRoomName() {
  let name = chance.word({ length: 6 });
  while (!activeRooms.includes(name)){
    name = chance.word({ length: 6 });
    activeRooms.push(name);
  }
  return name;
}