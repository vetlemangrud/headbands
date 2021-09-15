<script>
    export let roomName = "";
    export let members = [];
</script>
<h2>Room {roomName}</h2>
<h3>Members</h3>
<ul>
    {#each members as member}
        <li>{member}</li>
    {/each}
</ul>