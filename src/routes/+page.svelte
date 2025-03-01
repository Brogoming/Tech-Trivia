<script>
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	let { data } = $props();

	import { Button, Dropdown, DropdownItem, Select } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import TeamName from '$lib/TeamName.svelte';

	let selectedGame = $state('');
	let startButtonText = $state('');
	let numberOfTeams = $state(null);
	let teams = $state([
        { "name": "", "points": 0 }, 
        { "name": "", "points": 0 }, 
        { "name": "", "points": 0 } 
		]);


	onMount(async () => {
		const response = teams
	    console.log(teams);
		const data = await response.json();
		teams = data.teams;
		console.log(teams);
	});

	function selectGame(slug) {
		console.log('Selecting game:', slug);
		selectedGame = slug;
		startButtonText = `Start ${slug}`;
	}

	function startGame() {
		if (!selectedGame) {
			alert('Please select a game');
			return;
		}
		if (numberOfTeams === null) {
			alert('Please select the number of teams');
			return;
		}
		const validTeams = teams.filter((team) => team.name.trim() !== '');
		if (validTeams.length === numberOfTeams) {
			localStorage.setItem('teams', JSON.stringify(validTeams));
			window.location.href = `/board/${selectedGame}`;
		} else {
			alert('Please enter names for all teams');
		}
	}

	function updateTeams() {
		if (numberOfTeams !== null) {
			teams = Array(numberOfTeams)
				.fill()
				.map((_, i) => teams[i] || { name: '' });
		}
	}
</script>

<div class="min-h-screen flex flex-col">
	<div class="flex w-1/2 mx-auto p-4">
		<div class="flex-initial font-bold px-4 py-2 m-2 mx-auto p-4">
			<h1 class="text-8xl">Tech Trivia</h1>
		</div>
	</div>

	<div class="flex p-4 absolute right-5 top-1/2 transform -translate-y-1/2">
		<div class="flex items-center">
			<Button>Select a Game Set<ChevronDownOutline class="w-6 h-6 ms-2 text-white" /></Button>
		</div>
		<Dropdown>
			<ul>
				{#each data.games as { slug }}
					<li>
						<button
							class={`py-2 px-4 ${selectedGame === slug ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
							onclick={() => selectGame(slug)}
						>
							{slug}
						</button>
					</li>
				{/each}
			</ul>
		</Dropdown>
	</div>

	<div class="flex flex-col items-start space-y-4">
		<div class="flex items-center space-x-2">
			<label for="numberOfTeams" class="text-lg font-bold">How many teams?</label>
			<Select
				id="numberOfTeams"
				bind:value={numberOfTeams}
				on:change={updateTeams}
				class="w-16 text-center"
			>
				<option value={null}>Select</option>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
			</Select>
		</div>

		{#if numberOfTeams !== null}
			{#each teams as team, i}
				<div class="flex items-center space-x-2">
					<label for="team{i + 1}" class="text-lg font-bold">Team {i + 1}:</label>
					<input
						type="text"
						id="team{i + 1}"
						bind:value={team.name}
						placeholder={`Team ${i + 1}`}
						class="flex-grow p-2 border rounded bg-blue-500 text-white placeholder-white focus:outline-none focus:ring focus:ring-blue-300"
					/>
				</div>
			{/each}
		{/if}
	</div>

	<div class="fixed bottom-10 left-0 right-0 flex justify-center w-full">
		<button
			class="w-full md:w-auto relative hover:bg-blue-700 text-white font-bold py-2 px-4 text-5xl"
			onclick={startGame}
		>
			{#if startButtonText === ''}
				Please select a game
			{:else}
				{startButtonText}
			{/if}
		</button>
	</div>
</div>
