<script>
	import QuestionCell from '$lib/QuestionCell.svelte';
	import TeamCard from '$lib/TeamCard.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from "svelte" 
	import { browser } from "$app/environment" 
	import { json } from '@sveltejs/kit';

	let { data } = $props();
	let gameSet = data.post.set;

	let teams = $state([]);

	onMount(() => { 

	if (browser) { 
		const storedTeams = localStorage.getItem("teams"); 
		if (storedTeams) { 
			teams = JSON.parse(storedTeams); 
		} 
	}} )

	let secondsTimer = $state(15); //TODO: temporary

	function endGame() {
		teams = [...teams].sort((a, b) => b.points - a.points);
		localStorage.setItem('teams', JSON.stringify(teams));
	}
	
</script>

<div class="grid grid-cols-3 p-2 justify-center text-4xl">
	<a class="mr-auto" href="/"><Icon icon="mdi-light:home" /></a>
	<h1 class="text-center">{data.post.slug}</h1>
	<a
		class="ml-auto border-4 border-solid border-blue-900 rounded-md px-4 text-base my-auto bg-blue-700 hover:bg-blue-400 hover:border-blue-600"
		onclick={endGame}
		href="/congrats">End Game</a
	>
</div>

<div class="m-auto">
	<div class="flex place-content-center text-4xl">
		{#each Object.keys(gameSet) as category}
			<div>
				<div class="categoryCell border-4 border-solid border-black p-9 text-center">
					{category}
				</div>
				{#each Object.keys(gameSet[category]) as question}
					<QuestionCell
						points={gameSet[category][question].points}
						{question}
						answer={gameSet[category][question].answer}
						{teams}
						{secondsTimer}
					/>
				{/each}
			</div>
		{/each}
	</div>
</div>

<div class="mt-4 flex">
	{#each teams as team}
		<TeamCard name={team.name} points={team.points} />
	{/each}
</div>

<style>
	.categoryCell {
		background-image: radial-gradient(#002bf1, #0c0069);
	}
</style>
