<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let roomName = "";
    export let members = [];
    export let host = false;
    export let character = "";
    let isReady = false;

    function startGame(){
        dispatch("startGame");
    }

    function ready() {
        isReady = true;
        dispatch("ready");
    }

    $: allAreReady = () => {
        return members.every(member => member[1])
    }
</script>
<h2>Room {roomName}</h2>

<p>Enter a character that everyone knows!</p>
{#if isReady}
    <p>{character}</p>
{:else}
    <input type="text" bind:value={character}>
    <button on:click={ready}>Ready</button>
{/if}


<h3>Members</h3>
<ul>
    {#each members as member}
        <li>{member[0]} is {member[1] ? "ready" : "not ready"}</li>
    {/each}
</ul>
{#if host}
    <button on:click={startGame} disabled={!allAreReady()} title={!allAreReady() ? "Please wait until everyone is ready" : null}>Start Game</button>
{/if}