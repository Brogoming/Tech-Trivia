<script>
	let { question, answer } = $props();
	let flipped = $state(false);
</script>

<button
	class="card w-full rounded-3xl border-4 border-solid border-black text-center text-wrap md:text-base lg:text-2xl md:py-24 lg:py-32 {flipped
		? 'flipped'
		: ''}"
	onclick={() => (flipped = !flipped)}
	aria-label="Question card"
	><div class="front">
		{answer}
	</div>
	<div class="back">
		{question}
	</div>
</button>

<style>
	.card {
		background-image: radial-gradient(#5271ff, #3400b2);
		transform: rotateY(180deg);
		transition: transform 1s;
		transform-style: preserve-3d;
	}
	.card.flipped {
		transform: rotateY(0);
	}

	.front,
	.back {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 2em;
		border: 1px solid var(--fg-2);
		box-sizing: border-box;
		padding: 2em;
	}

	.back {
		transform: rotateY(180deg);
	}
</style>
