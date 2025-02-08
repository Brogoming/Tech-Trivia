<script>
	import { base } from '$app/paths';
	let { data } = $props();
</script>

<h1>Home</h1>

<ul>
	{#each data.games as { slug }}
		<li><a href="{base}/board/{slug}">{slug}</a></li>
	{/each}
</ul>
