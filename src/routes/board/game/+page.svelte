<script>
export let gameSet = {}
</script>

{#each Object.keys(gameSet) as category}
    <div><div>{category}</div>
</div>
{/each}