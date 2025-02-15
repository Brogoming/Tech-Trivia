<script>
	export let question = '';
	export let answer = '';
	export let points = 0;
	export let isAvailble = true;
</script>

<button
	class="bgCell w-full border-4 border-solid border-black p-7 text-6xl font-extrabold text-black"
	onclick={() => {
		console.log(question);
	}}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			console.log(question);
		}
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
