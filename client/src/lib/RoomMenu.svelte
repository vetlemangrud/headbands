<script>
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

let roomToJoin;
let name = "";

function joinRoom(){
    dispatch("joinRoom", {
        room: roomToJoin,
        name: name
    });
}

function createRoom() {
    dispatch("createRoom", {
        name: name
    });
}

function validName(name){
    return name.trim().length > 0;
}

</script>
<style>
    main {
        width: 200px;
        margin:auto;
    }
    h2,p{
        text-align: center;
    }
    button {
        width:100%;
        text-align: center;
        margin: auto;
    }
    main > input {
        width:192px;
        margin-bottom: 20px;
    }
</style>
<main>
    <h2>Join room</h2>
    <p>Name</p>
    <input type="text" bind:value={name}>
    <p>Room</p>
    <input type="text" bind:value={roomToJoin}>
    <button on:click={joinRoom} disabled = {!validName(name)} title={!validName(name) ? "Please enter a name" : null}>Join</button>
    
    <p>or</p>
    <button on:click={createRoom} disabled = {!validName(name)} title={!validName(name) ? "Please enter a name" : null}>Create</button>
</main>