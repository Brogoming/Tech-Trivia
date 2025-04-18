<script>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	let teams = $state([
		{ name: 'team1', points: 0 },
		{ name: 'team2', points: 0 },
		{ name: 'team3', points: 0 }
	]);

	onMount(() => {
		if (browser) {
			const storedTeams = sessionStorage.getItem('teams');
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

<div
	class="flex fixed bottom-0 inset-x-0 {teams.length == 2
		? ''
		: 'justify-center'} text-center text-3xl w-full lg:text-4xl xl:text-5xl 2xl:text-6xl -space-x-20 xl:-space-x-24 2xl:-space-x-40"
>
	<div
		class="max-w-sm lg:max-w-3xl"
		style="translate: 0 25%"
		in:fly={{ y: 200, duration: 1000, delay: 1000, easing: backOut }}
	>
		{#if teams.length > 1}
			<div>{teams.at(1).name}: {teams.at(1).points}</div>
			<enhanced:img src="../../PedestalPics/Second.png" alt="Second" />
		{/if}
	</div>
	<div
		style="translate: 0 5%"
		class="z-40 max-w-sm lg:max-w-3xl"
		in:fly={{ y: 200, duration: 1000, delay: 1500, easing: backOut }}
	>
		<div>{teams.at(0).name}: {teams.at(0).points}</div>
		<enhanced:img src="../../PedestalPics/First.png" alt="First" />
	</div>
	<div
		style="translate: 0 35%"
		class="max-w-sm lg:max-w-3xl"
		in:fly={{ y: 200, duration: 1000, delay: 500, easing: backOut }}
	>
		{#if teams.length == 3}
			<div>{teams.at(2).name}: {teams.at(2).points}</div>
			<enhanced:img src="../../PedestalPics/Third.png" alt="Third" />
		{/if}
	</div>
</div>

<div class="w-full h-4 bg-black absolute inset-x-0 bottom-0 z-50"></div>
