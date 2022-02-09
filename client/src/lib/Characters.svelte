<script>
    export let characterMap;
</script>
<style>
    main{
        width: 200px;
        margin: auto;
    }
    ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
        
    }
    li {
        margin-bottom: 20px;
        width: 180px;
        text-align: center;
        padding: 10px;
        background-color: #EEEBD3;
        color: black;
        word-wrap: break-word;
    }
    .memberName{
        font-weight: bold;
    }
</style>
<main>
    <h2>Other characters</h2>
    <ul>
        {#each characterMap as character}
            <li><span class="memberName">{character[0]}</span> is {character[1]}</li>
        {/each}
    </ul>
</main>
