<script>
    import RoomMenu from "$lib/RoomMenu.svelte";
    import Lobby from "$lib/Lobby.svelte";
    import Characters from "$lib/Characters.svelte";
    
    import { io } from "socket.io-client";

    const socket = io("https://hvem-er-jeg.herokuapp.com/");

    let currentRoom = "";
    let host = false;
    let chooseNames = false;
    let character = "";
    let roomMembers = [];
    let characters;

    socket.on("newRoom", name => {
        console.log(name);
    });

    socket.on("joinRoomSuccess", name => {
        currentRoom = name;
    });

    socket.on("roomMemberUpdate", members => {
        roomMembers = members;
    });

    socket.on("host", () => {
        host = true;
    });

    socket.on("chooseNames", () => {
        chooseNames = true;
    });

    socket.on("gameStarted", characterMap => {
        characters = characterMap;
    });

    function startGame() {
        socket.emit("startGame", currentRoom);
    }

    function ready() {
        socket.emit("ready", currentRoom, character);
    }

</script>
<style>
    
    header {
        background-color: #437C90;
        padding: 40px;
        text-align: center;
        
    }
    header, main{
        color: #EEEBD3;
        font-family: 'Raleway', sans-serif;
    }
    
    
</style>
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
    {:else if characters}
        <Characters characterMap = {characters}></Characters>
    {:else}
        <Lobby roomName = {currentRoom} members = {roomMembers} host = {host} bind:character = {character} on:startGame = {startGame} on:ready = {ready}></Lobby>
    {/if}
</main>   