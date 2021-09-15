<script>
    export let roomName = "";
    export let members = [];
    export let host = false;
</script>
<h2>Room {roomName}</h2>
<h3>Members</h3>
<ul>
    {#each members as member}
        <li>{member}</li>
    {/each}
</ul>
{#if host}
     <button>Start Game</button>
{/if}