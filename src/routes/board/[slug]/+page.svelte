<script>
	import QuestionCell from '$lib/QuestionCell.svelte';
	import TeamCard from '$lib/TeamCard.svelte';
	import Icon from '@iconify/svelte';

	let { data } = $props();
	let gameSet = data.post.set;

	let teams = $state([
		//TODO: temporary
		{ name: 'team1', points: 0 },
		{ name: 'team2', points: 0 },
		{ name: 'team3', points: 0 }
	]);
	let secondsTimer = $state(15); //TODO: temporary
</script>

<div class="grid grid-cols-3 p-2 justify-center text-4xl">
	<a class="mr-auto" href="/"><Icon icon="mdi-light:home" /></a>
	<h1 class="text-center">{data.post.slug}</h1>
	<a
		class="ml-auto border-4 border-solid border-blue-900 rounded-md px-4 text-base my-auto bg-blue-700 hover:bg-blue-400 hover:border-blue-600"
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
