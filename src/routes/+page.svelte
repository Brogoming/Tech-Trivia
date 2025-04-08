<script>
	import { base } from '$app/paths';
	import { Select } from 'flowbite-svelte';
	import { fly } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	let { data } = $props();

	let timerOptions = [
		{ value: 5, label: '5 seconds' },
		{ value: 10, label: '10 seconds' },
		{ value: 15, label: '15 seconds' },
		{ value: 20, label: '20 seconds' },
		{ value: 25, label: '25 seconds' },
		{ value: 30, label: '30 seconds' }
	];

	let selectedGame = $state('');
	let startButtonText = $state('');
	let selectedTimer = $state(timerOptions[0].value);
	let numberOfTeams = $state(0);
	let teams = $state([
		{ name: 'team1', points: 0 },
		{ name: 'team2', points: 0 },
		{ name: 'team3', points: 0 }
	]);

	function selectGame() {
		console.log('Selecting game:', selectedGame);
		selectedGame = selectedGame;
		startButtonText = `Start ${selectedGame}`;
		if (selectedGame === 'custom') {
			triggerFileUpload();
		}
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
			localStorage.setItem('timerSeconds', selectedTimer); // Use selectedTimer here
			localStorage.setItem('timerSeconds', selectedTimer); // Use selectedTimer here
			window.location.href = `${base}/board/${selectedGame}`;
			if (selectedGame === 'custom') {
				window.location.href = `${base}/board/custom`;
			} else {
				window.location.href = `${base}/board/${selectedGame}`;
			}
		} else {
			alert('Please enter names for all teams');
		}
	}

	function updateTeams() {
		if (numberOfTeams !== null) {
			teams = Array.from({ length: numberOfTeams }, (_, i) => {
				let name = '';
				if (teams[i] && teams[i].name.trim() !== '') {
					name = teams[i].name;
				} else {
					name = `team${i + 1}`;
				}
				return {
					name,
					points: 0
				};
			});
		}
	}

	let uploadedData = null;

	function handleFileUpload(event) {
		const file = event.target.files[0];
		if (file && file.type === 'application/json') {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const jsonData = JSON.parse(e.target.result);
					localStorage.setItem('uploadedJson', JSON.stringify(jsonData));
					uploadedData = jsonData;
					alert('JSON file successfully uploaded and saved to local storage!');
					selectedGame = 'custom';
				} catch (error) {
					alert('Invalid JSON format. Please upload a valid JSON file.');
				}
			};
			reader.readAsText(file);
		} else {
			alert('Please upload a valid JSON file.');
		}
	}

	function triggerFileUpload() {
		const fileInputElement = document.getElementById('jsonUpload');
		if (fileInputElement) {
			fileInputElement.click();
		}
	}
</script>

<input type="file" id="jsonUpload" accept=".json" onchange={handleFileUpload} class="hidden" />

<div class="flex font-bold px-4 py-2 m-2 justify-center">
	<h1 class="text-8xl glow">Tech Trivia</h1>
</div>
<div class="grid grid-cols-2 text-xl">
	<div>
		<label for="numberOfTeams" class="font-bold">How many teams?</label>
		<Select
			id="numberOfTeams"
			bind:value={numberOfTeams}
			on:change={updateTeams}
			class="w-fit text-center text-black"
		>
			<option value={0}>Select</option>
			<option value={1}>1</option>
			<option value={2}>2</option>
			<option value={3}>3</option>
		</Select>
		{#each teams.slice(0, numberOfTeams) as team, i}
			<div
				class="flex items-center space-x-2 space-y-2"
				in:fly={{ y: -25, duration: 500, delay: 500, easing: expoInOut }}
				out:fly={{ y: -25, duration: 500, delay: 500, easing: expoInOut }}
			>
				<label for="team{i + 1}" class="text-lg font-bold">Team {i + 1}:</label>
				<input
					type="text"
					id="team{i + 1}"
					bind:value={team.name}
					class="flex p-2 w-1/3 border rounded bg-blue-500 text-white placeholder-white focus:outline-none focus:ring focus:ring-blue-300"
				/>
			</div>
		{/each}
	</div>
	<div class="mr-0 ml-auto space-y-2">
		<div>
			<label for="selectedGame" class="font-bold">Select a Game Set:</label>
			<Select
				id="selectedGame"
				bind:value={selectedGame}
				on:change={selectGame}
				class="w-fit text-center text-black"
			>
				<!-- <option value={null}>Select</option> -->
				{#each data.games as { slug }}
					<option value={slug}>{slug}</option>
				{/each}
				<option value={'custom'}>Custom</option>
			</Select>
		</div>
		<div>
			<label for="timerSeconds" class="font-bold">Time Per Question:</label>
			<Select id="timerSeconds" bind:value={selectedTimer} class="w-fit text-center text-black">
				{#each timerOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</Select>
		</div>
	</div>
</div>
<div class="fixed bottom-10 left-0 right-0 flex justify-center w-full">
	<button
		class="transition border-4 border-solid border-blue-900 rounded-md p-4 text-lg lg:text-5xl my-auto bg-blue-700 hover:bg-blue-400 hover:border-blue-600 hover:text-blue-900 duration-300"
		onclick={startGame}
	>
		{#if startButtonText === ''}
			Please select a game
		{:else}
			{startButtonText}
		{/if}
	</button>
</div>

<style>
	.glow {
		text-align: center;
		animation: glow 1s ease-in-out infinite alternate;
	}

	@keyframes glow {
		from {
			text-shadow: 0 0 30px #005ce6;
		}
		to {
			text-shadow:
				0 0 40px #005ce6,
				0 0 50px #005ce6,
				0 0 60px #005ce6;
		}
	}
</style>
