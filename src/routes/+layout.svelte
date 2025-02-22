<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="bgGradient h-screen bg-cover bg-fixed bg-center">
	{@render children()}
</div>

<style>
	.bgGradient {
		background-image: radial-gradient(#4b0079, #1f0086);
		border: 16px solid rgb(0, 0, 0);
		border-radius: 2em;
	}
</style>
