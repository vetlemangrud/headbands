<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let roomName = "";
    export let members = [];
    export let host = false;
    export let character = "";

    function startGame(){
        dispatch("startGame");
    }

    function ready() {
        dispatch("ready");
    }
</script>
<h2>Room {roomName}</h2>

<p>Enter a character that everyone knows!</p>
<input type="text" bind:value={character}>
<button on:click={ready}>Ready</button>

<h3>Members</h3>
<ul>
    {#each members as member}
        <li>{member}</li>
    {/each}
</ul>
{#if host}
     <button on:click={startGame}>Start Game</button>
{/if}