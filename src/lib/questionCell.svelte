<script>
	import QuestionModal from './QuestionModal.svelte';
	let { question, answer, points, teams } = $props();
	let showModal = $state(false);
	let isAvailble = $state(true);
</script>

<QuestionModal
	show={showModal}
	on:close={() => (showModal = false)}
	{question}
	{answer}
	{points}
	{isAvailble}
	{teams}
/>

<button
	class="bgCell w-full border-4 border-solid border-black p-7 text-center text-6xl font-extrabold text-black"
	onclick={() => {
		showModal = true;
	}}
	aria-label="Points button"
>
	{points}
</button>

<style>
	.bgCell {
		background-image: radial-gradient(#5271ff, #3400b2);
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: #ffbd95;
	}
</style>
