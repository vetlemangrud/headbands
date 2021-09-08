const io = require("socket.io")(3001 , {
  cors:  {
    origin: 'http://localhost:3000'
  }
});


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
  console.log("Creating room");
}{

}

function joinRoom(socket, name) {
  console.log("Socket joining " + name);
}