<script>
    import Icon from '@iconify/svelte';

	let { data } = $props();

    let teams = $state([
		//TODO: temporary
		{ name: 'team1', points: 1000 },
		{ name: 'team2', points: 1300 },
		{ name: 'team3', points: 980 }
	]);
</script>

<style>
    
    .column {
        width: 33.33%;
        float: left;
    }
    .placements {
        text-align: center;
    }
    .first {
        padding: 15px;
    }
    .second {
        padding: 55px;
    }
    .third {
        padding: 75px;
    }
</style>

<div class="grid grid-cols-3 p-2 justify-center text-4xl">
	<a class="mr-auto" href="/"><Icon icon="mdi-light:home" /></a>
    <div class="flex place-content-center text-center text-4xl"><h1>Congrats</h1></div>
</div>


<div class="columns">
    <div class="column">
        <div class="second"></div>
        <header class="placements">Second</header>
    </div>
    <div class="column">
        <div class="first"></div>
        <header class="placements">First</header>
    </div>
    <div class="column">
        <div class="third"></div>
        <header class="placements">Third</header>
    </div>
</div>