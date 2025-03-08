<script>
    import Icon from '@iconify/svelte';
    import TeamCard from '$lib/TeamCard.svelte';


	let { data } = $props();
    let teams = $state([
		//TODO: temporary
		{ name: 'Team1', points: 1400 },
		{ name: 'Team2', points: 1300 },
		{ name: 'Team3', points: 1900 }
	]);

    // svelte-ignore state_referenced_locally
        teams = [...teams].sort((a, b) => b.points - a.points);

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
        padding: 56px;
    }
    .third {
        padding: 84px;
    }
</style>

<div class="grid grid-cols-3 p-2 justify-center text-4xl">
	<a class="mr-auto" href="/"><Icon icon="mdi-light:home" /></a>
    <div class="flex place-content-center text-center text-4xl"><h1>Congrats</h1></div>
</div>

<div class="columns">
    <div class="column">
        <div class="second"></div>
        <div class="placements">
            <header style="font-size: 45px;">{teams.at(1).name}</header>
            <header style="font-size: 30px;">{teams.at(1).points}</header>
            <enhanced:img src='../../PedestalPics/Second.avif' alt="Second" />
        </div>
    </div>
    <div class="column">
        <div class="first"></div>
        <div class="placements">
            <header style="font-size: 45px;">{teams.at(0).name}</header>
            <header style="font-size: 30px;">{teams.at(0).points}</header>
            <enhanced:img src='../../PedestalPics/first.avif' alt="First" />
        </div>
    </div>
    <div class="column">
        <div class="third"></div>
        <div class="placements">
            <header style="font-size: 45px;">{teams.at(2).name}</header>
            <header style="font-size: 30px;">{teams.at(2).points}</header>
            <enhanced:img src='../../PedestalPics/Third.avif' alt="Third" />
        </div>
    </div>
</div>