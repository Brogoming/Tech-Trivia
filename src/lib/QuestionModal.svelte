<script>
	import { createEventDispatcher } from 'svelte';
	import TeamCard from './TeamCard.svelte';
	import QuestionCard from './QuestionCard.svelte';

	const dispatch = createEventDispatcher();
	let { question, answer, points, teams, show = false, isAvailble, secondsTimer = 15 } = $props();
	let startTimer = $state(false);

	function handleDisable() {
		dispatch('close');
		dispatch('disableButton'); // Notify parent to disable button
	}

	$effect(() => {
		setInterval(() => {
			if (startTimer) {
				secondsTimer -= 1;
			}
			if (secondsTimer <= 0) {
				startTimer = false;
			}
		}, 1000);
	});
</script>

{#if show}
	<div class="fixed inset-0 flex bg-black bg-opacity-50 text-xl z-10">
		<div class="relative m-auto w-2/5 rounded-lg bg-black shadow-lg space-y-2 h-fit">
			<button
				onclick={() => {
					startTimer = false;
					secondsTimer = 15;
					dispatch('close');
				}}
				class="absolute right-1 top-1 text-xl">❌</button
			>
			<div class="pt-7">
				<QuestionCard {question} {answer} />
			</div>
			<div class="flex">
				<button
					class="w-1/2 p-2 border-4 border-solid border-lime-950 bg-lime-800 hover:bg-lime-600 {!startTimer
						? 'border-lime-950 bg-lime-800 hover:bg-lime-600'
						: 'border-red-950 bg-red-800 hover:bg-red-600'}"
					onclick={() => {
						startTimer = !startTimer;
						if (secondsTimer <= 0) {
							secondsTimer = 15; //This resets it back to 15 seconds
						}
					}}>{!startTimer ? 'Start' : 'Stop'} Time: {secondsTimer}</button
				><button
					class="w-1/2 p-2 border-4 border-solid border-yellow-950 bg-yellow-800 hover:bg-yellow-600"
					onclick={() => {
						handleDisable();
					}}>No Answer</button
				>
			</div>
			<div class="space-y-2">
				{#each teams as team}
					<button
						class="w-full rounded-xl border-4 border-solid border-black bg-gray-500 px-16 py-2 text-2xl text-black hover:bg-gray-400"
						onclick={() => {
							team.points += points;
							handleDisable();
						}}>{team.name}: {team.points} pts</button
					>
				{/each}
			</div>
		</div>
	</div>
{/if}
