<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="bgGradient bg-fixed bg-center bg-cover h-screen">
	{@render children()}
</div>