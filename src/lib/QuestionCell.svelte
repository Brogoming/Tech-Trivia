<script>
	import QuestionModal from './QuestionModal.svelte';
	let { question, answer, points, teams, secondsTimer } = $props();
	let showModal = $state(false);
	let isAvailble = $state(true);
</script>

<QuestionModal
	show={showModal}
	on:close={() => (showModal = false)}
	on:disableButton={() => {
		isAvailble = false;
	}}
	{question}
	{answer}
	{points}
	{isAvailble}
	{teams}
	{secondsTimer}
/>

<button
	class="bgCell w-full border-4 border-solid border-black py-5 text-center text-6xl font-extrabold text-black {isAvailble
		? ''
		: 'disableCell pointer-events-none'}"
	onclick={() => {
		showModal = true;
	}}
	disabled={!isAvailble}
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
	.disableCell {
		background-image: radial-gradient(#041b85, #180052);
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: #722c00;
	}
</style>
