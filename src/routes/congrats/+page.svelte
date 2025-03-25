<script>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { base } from '$app/paths';

	let teams = $state([
		{ name: 'team1', points: 0 },
		{ name: 'team2', points: 0 },
		{ name: 'team3', points: 0 }
	]);

	onMount(() => {
		if (browser) {
			const storedTeams = localStorage.getItem('teams');
			if (storedTeams) {
				teams = JSON.parse(storedTeams);
			}
		}
	});
</script>

<div class="grid grid-cols-3 p-2 justify-center sm:text-3xl md:text-4xl lg:text-5xl">
	<a class="mr-auto" href="{base}/"><Icon icon="mdi-light:home" /></a>
	<div class="flex place-content-center text-center">Congrats!</div>
</div>

<div class="flex text-center sm:text-4xl md:text-5xl lg:text-6xl">
	<div style="">
		{#if teams.length > 1}
			<div>{teams.at(1).name}: {teams.at(1).points}</div>
			<enhanced:img src="../../PedestalPics/Second.png" alt="Second" />
		{/if}
	</div>
	<div style="">
		<header>{teams.at(0).name}: {teams.at(0).points}</header>
		<enhanced:img src="../../PedestalPics/First.png" alt="First" />
	</div>
	<div class="">
		{#if teams.length == 3}
			<header style="">{teams.at(2).name}: {teams.at(2).points}</header>
			<enhanced:img src="../../PedestalPics/Third.png" alt="Third" />
		{/if}
	</div>
</div>

<div class="w-full h-4 bg-black absolute inset-x-0 bottom-0 z-40"></div>
