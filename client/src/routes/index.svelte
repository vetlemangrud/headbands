<script>
    import RoomMenu from "$lib/RoomMenu.svelte";
    import Lobby from "$lib/Lobby.svelte";
    
    import { io } from "socket.io-client";

    const socket = io("ws://localhost:3001");

    let currentRoom = "";
    let host = false;

    socket.on("newRoom", (name) => {
        console.log(name);
    })

    socket.on("joinRoomSuccess", (name) => {
        currentRoom = name;
    })

</script>
<header>
    <h1>Headbands</h1>
</header>
<main>
    {#if currentRoom == ""}
        <RoomMenu 
        on:joinRoom = {evt => {
            console.log("Joining room: "+evt.detail.room);
            socket.emit("joinRoom", evt.detail.room);
            
        }}
        on:createRoom = {evt => {
            console.log("Creating room");
            socket.emit("createRoom");
        }}></RoomMenu>

    {:else}
         <Lobby roomName = {currentRoom}></Lobby>
    {/if}
</main>   