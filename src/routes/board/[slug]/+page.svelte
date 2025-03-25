<script>
	import QuestionCell from '$lib/QuestionCell.svelte';
	import TeamCard from '$lib/TeamCard.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { base } from '$app/paths';

	let { data } = $props();
	let gameSet = data.post.set;

	let teams = $state([]);

	onMount(() => {
		if (browser) {
			const storedTeams = localStorage.getItem('teams');
			if (storedTeams) {
				teams = JSON.parse(storedTeams);
			}
		}
	});

	let secondsTimer = $state(15); //TODO: temporary

	function endGame() {
		teams = [...teams].sort((a, b) => b.points - a.points);
		localStorage.setItem('teams', JSON.stringify(teams));
	}
</script>

<div class="grid grid-cols-3 p-2 justify-center sm:text-3xl md:text-4xl lg:text-5xl">
	<a class="mr-auto" href="{base}/"><Icon icon="mdi-light:home" /></a>
	<h1 class="text-center">{data.post.slug}</h1>
	<a
		class="ml-auto border-4 border-solid border-blue-900 rounded-md px-4 sm:text-xl md:text-2xl lg:text-3xl my-auto bg-blue-700 hover:bg-blue-400 hover:border-blue-600"
		onclick={endGame}
		href="{base}/congrats">End Game</a
	>
</div>

<div class="py-10">
	<div class="grid grid-cols-6">
		{#each Object.keys(gameSet) as category}
			<div>
				<div
					class="categoryCell border-4 border-solid border-black py-9 text-center sm:text-lg md:text-xl lg:text-2xl"
				>
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

	<div class="mt-4 flex">
		{#each teams as team}
			<TeamCard name={team.name} points={team.points} />
		{/each}
	</div>
</div>

<style>
	.categoryCell {
		background-image: radial-gradient(#002bf1, #0c0069);
	}
</style>
