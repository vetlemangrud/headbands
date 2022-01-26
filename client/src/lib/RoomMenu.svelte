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
<h2>Join room</h2>
<p>Name</p>
<input type="text" bind:value={name}>
<p>Room</p>
<input type="text" bind:value={roomToJoin}>
<button on:click={joinRoom} disabled = {!validName(name)} title={!validName(name) ? "Please enter a name" : null}>Join</button>
<p>or</p>
<button on:click={createRoom} disabled = {!validName(name)} title={!validName(name) ? "Please enter a name" : null}>Create</button>