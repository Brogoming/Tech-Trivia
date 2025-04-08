<script>
	import { base } from '$app/paths';
	let { data } = $props();

	import { Button, Dropdown, Select } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	let timerOptions = [
        { value: 5, label: '5 seconds' },
        { value: 10, label: '10 seconds' },
        { value: 15, label: '15 seconds' },
        { value: 20, label: '20 seconds' },
        { value: 25, label: '25 seconds' },
        { value: 30, label: '30 seconds' }
    ];

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
	let selectedTimer = $state(timerOptions[0].value);
	let numberOfTeams = $state(null);
	let teams = $state([
		{ name: 'team1', points: 0 },
		{ name: 'team2', points: 0 },
		{ name: 'team3', points: 0 }
	]);

	function selectGame(slug) {
		console.log('Selecting game:', slug);
		selectedGame = slug;
		startButtonText = `Start ${slug}`;
		if (slug === 'custom') {
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
	  if (file && file.type === "application/json") {
	    const reader = new FileReader();
	    reader.onload = (e) => {
	      try {
	        const jsonData = JSON.parse(e.target.result);
	        localStorage.setItem("uploadedJson", JSON.stringify(jsonData));
	        uploadedData = jsonData;
	        alert("JSON file successfully uploaded and saved to local storage!");
	        selectedGame = 'custom';
	      } catch (error) {
	        alert("Invalid JSON format. Please upload a valid JSON file.");
	      }
	    };
	    reader.readAsText(file);
	  } else {
	    alert("Please upload a valid JSON file.");
	  }
	}

	function triggerFileUpload() {
	  const fileInputElement = document.getElementById('jsonUpload');
	  if (fileInputElement) {
	    fileInputElement.click();
	  }
	}
</script>

<div class="flex flex-col">
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
                            class={`py-2 px-4 ${selectedGame === slug ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'}`}
                            onclick={() => selectGame(slug)}
                        >
                            {slug}
                        </button>
                    </li>
                {/each}
                <li>
                    <button
                        class={`py-2 px-4 ${selectedGame === 'custom' ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'}`}
                        onclick={() => selectGame('custom')}
                    >
                        Custom
                    </button>
                </li>
            </ul>
        </Dropdown>
    </div>

    <!-- Hidden File Input -->
    <input
        type="file"
        id="jsonUpload"
        accept=".json"
        onchange={handleFileUpload}
        class="hidden"
    />

    <!-- Remaining UI elements -->
    <div class="flex flex-col items-start space-y-4">
        <div class="flex items-center space-x-2">
            <label for="numberOfTeams" class="text-lg font-bold">How many teams?</label>
            <Select
                id="numberOfTeams"
                bind:value={numberOfTeams}
                on:change={updateTeams}
                class="w-20 text-center text-black"
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
						class="flex-grow p-2 border rounded bg-blue-500 text-white placeholder-white focus:outline-none focus:ring focus:ring-blue-300"
					/>
				</div>
			{/each}
		{/if}
	</div>

<div style="margin-bottom: 40px;">
	
</div>
	<div class="flex items-center space-x-2">
		<label for="timerSeconds" class="text-lg font-bold">Time Per Question:</label>
		<Select
        id="timerSeconds"
        bind:value={selectedTimer}
        class="w-40 text-center text-black"
    	>
        {#each timerOptions as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    	</Select>
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
