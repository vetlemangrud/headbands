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
<style>
    main {
        width: 200px;
        margin:auto;
        text-align: center;
    }
    ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
        margin-bottom: 20px;
        word-wrap: break-word;
    }
    #characterSelection {
        background-color: #EEEBD3;
        color: black;
        padding: 20px;
    }
    #characterSelection input {
        width: 152px;
        margin-bottom: 20px;
        font-size: large;
    }
    .memberName {
        font-weight: bold;
    }
</style>
<main>
    <h2>Room {roomName}</h2>
    <div id="characterSelection">
        <p>Enter a character that everyone knows!</p>
        {#if isReady}
            <p>{character}</p>
        {:else}
            <input type="text" bind:value={character}>
            <button on:click={ready}>Ready</button>
        {/if}
    </div>
    
    
    <h3>Members</h3>
    <ul>
        {#each members as member}
            <li><span class="memberName">{member[0]}</span> is {member[1] ? "ready" : "not ready"}</li>
        {/each}
    </ul>
    {#if host}
        <button on:click={startGame} disabled={!allAreReady()} title={!allAreReady() ? "Please wait until everyone is ready" : null}>Start Game</button>
    {/if}
</main>
