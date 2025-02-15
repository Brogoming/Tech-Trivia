<script>
	import { createEventDispatcher } from 'svelte';
	import TeamCard from './TeamCard.svelte';
	import QuestionCard from './QuestionCard.svelte';

	const dispatch = createEventDispatcher();
	let { question, answer, points, teams, show = false, isAvailble, secondsTimer = 15 } = $props();

	function close() {
		dispatch('close');
	}
</script>

{#if show}
	<div class="fixed inset-0 flex bg-black bg-opacity-50 text-3xl">
		<div class="relative m-auto w-1/3 rounded-lg bg-black shadow-lg pb-7 space-y-2">
			<button onclick={close} class="absolute right-1 top-1 text-xl">❌</button>
			<div class="pt-7">
				<QuestionCard {question} {answer} />
			</div>
			<div class="flex">
				<button
					class="w-1/2 p-2 border-4 border-solid border-lime-950 bg-lime-800 hover:bg-lime-600"
					>Start Time: {secondsTimer}</button
				><button
					class="w-1/2 p-2 border-4 border-solid border-yellow-950 bg-yellow-800 hover:bg-yellow-600"
					onclick={() => {
						isAvailble = false;
						close();
					}}>No Answer</button
				>
			</div>
			<div class="space-y-2">
				{#each teams as team}
					<button
						class="w-full rounded-3xl border-4 border-solid border-black bg-gray-500 px-16 py-2 text-2xl text-black hover:bg-gray-400"
						onclick={() => {
							team.points = team.points + points;
							isAvailble = false;
							close();
						}}>{team.name}: {team.points} pts</button
					>
				{/each}
			</div>
		</div>
	</div>
{/if}
