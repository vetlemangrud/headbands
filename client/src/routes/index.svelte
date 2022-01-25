<script>
    import RoomMenu from "$lib/RoomMenu.svelte";
    import Lobby from "$lib/Lobby.svelte";
    
    import { io } from "socket.io-client";

    const socket = io("ws://localhost:3001");

    let currentRoom = "";
    let host = false;
    let chooseNames = false;
    let roomMembers = [];

    socket.on("newRoom", name => {
        console.log(name);
    });

    socket.on("joinRoomSuccess", name => {
        currentRoom = name;
    });

    socket.on("roomMemberUpdate", members => {
        roomMembers = members;
        console.log(members);
    });

    socket.on("host", () => {
        host = true;
    });

    socket.on("chooseNames", () => {
        chooseNames = true;
    });

    function startGame() {
        socket.emit("startGame", currentRoom);
    }

    function ready() {
        socket.emit("ready", currentRoom);
    }

</script>
<header>
    <h1>Headbands</h1>
</header>
<main>
    {#if currentRoom == ""}
        <RoomMenu 
        on:joinRoom = {evt => {
            console.log("Joining room: "+evt.detail.room);
            socket.emit("joinRoom", evt.detail.room, evt.detail.name);
            
        }}
        on:createRoom = {evt => {
            console.log("Creating room");
            socket.emit("createRoom", evt.detail.name);
        }}></RoomMenu>

    {:else}
        <Lobby roomName = {currentRoom} members = {roomMembers} host = {host} on:startGame = {startGame} on:ready = {ready}></Lobby>
    {/if}
</main>   