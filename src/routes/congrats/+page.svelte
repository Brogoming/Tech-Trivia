<script>
    import Icon from '@iconify/svelte';
    import { onMount } from "svelte" 
	import { browser } from "$app/environment" 


	let { data } = $props();
    
    let teams = $state([
        { "name": "team1", "points": 0 }, 
        { "name": "team2", "points": 0 }, 
        { "name": "team3", "points": 0 } 
		]);

	onMount(() => { 

	if (browser) { 
		const storedTeams = localStorage.getItem('teams'); 
		if (storedTeams) { 
			teams = JSON.parse(storedTeams); 
		} 
	}} )

    

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