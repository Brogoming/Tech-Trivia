<script>
	let { question, answer } = $props();
</script>

<button
	class="cardbg w-full rounded-3xl border-4 border-solid border-black py-24 text-center text-wrap {flipped
		? 'flipped'
		: ''}"
	onclick={() => {
		console.log('test');
	}}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			console.log('test');
		}
	}}
	aria-label="Question card"
>
	{question}
</button>

<style>
	.cardbg {
		background-image: radial-gradient(#5271ff, #3400b2);
	}
	.card.flipped {
		transform: rotateY(0);
	}
</style>
