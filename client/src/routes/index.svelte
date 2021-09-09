<script>
    import RoomMenu from "$lib/RoomMenu.svelte";
    
    import { io } from "socket.io-client";

    const socket = io("ws://localhost:3001");

    socket.on("newRoom", (name) => {
        console.log(name);
    })

</script>
<header>
    <h1>Headbands</h1>
</header>
<main>
    <RoomMenu 
    on:joinRoom = {evt => {
        console.log("Joining room: "+evt.detail.room);
        socket.emit("joinRoom", evt.detail.room);
        
    }}
    on:createRoom = {evt => {
        console.log("Creating room");
        socket.emit("createRoom");
    }}></RoomMenu>
</main>