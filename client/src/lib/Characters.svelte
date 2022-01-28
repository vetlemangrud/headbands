<script>
    export let characterMap;
</script>
<h2>Other characters</h2>
<ul>
    {#each characterMap as character}
        <li>{character[0]} is {character[1]}</li>
    {/each}
</ul>