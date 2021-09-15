<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let roomName = "";
    export let members = [];
    export let host = false;

    function startGame(){
    dispatch("startGame");
}
</script>
<h2>Room {roomName}</h2>
<h3>Members</h3>
<ul>
    {#each members as member}
        <li>{member}</li>
    {/each}
</ul>
{#if host}
     <button on:click={startGame}>Start Game</button>
{/if}