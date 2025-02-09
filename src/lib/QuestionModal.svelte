<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let { question, answer, points, isAvailble, teams, show = false } = $props();

	function close() {
		dispatch('close');
	}
</script>

{#if show}
	<div class="fixed inset-0 flex bg-black bg-opacity-50 text-3xl">
		<div class="relative m-auto w-1/3 rounded-lg bg-black shadow-lg">
			<button onclick={close} class="absolute right-1 top-1 text-xl">❌</button>
			<div class="pt-7">
				<div
					class="cardbg w-full rounded-3xl border-4 border-solid border-black py-24 text-center text-wrap"
				>
					{question}
				</div>
			</div>
			<div>timer and no answer buttons</div>
		</div>
	</div>
{/if}

<style>
	.cardbg {
		background-image: radial-gradient(#5271ff, #3400b2);
	}
</style>
