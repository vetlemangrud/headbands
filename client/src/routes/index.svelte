<script>
    import RoomMenu from "$lib/RoomMenu.svelte";
    
    import { io } from "socket.io-client";

    const socket = io("ws://localhost:3001");

</script>
<header>
    <h1>Headbands</h1>
</header>
<main>
    <RoomMenu on:joinRoom = {evt => {
        console.log(evt.detail.room);
        socket.emit("joinRoom", evt.detail.room);
        console.log(socket);
        
    }}></RoomMenu>
</main>