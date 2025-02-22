<script>
    import { base } from '$app/paths';
    let { data } = $props();

    import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import TeamName from '$lib/TeamName.svelte'

    let selectedGame = $state('');
    let startButtonText = $state('');

    function selectGame(slug) {
        console.log('Selecting game:', slug);
        selectedGame = slug;
        startButtonText = `Start ${slug}`;
    }

    function startGame() {
        if (selectedGame) {
            window.location.href = `/board/${selectedGame}`;
        }
    }

	// let teams = $state([
	// 	{ name: 'team1', points: 0 },
	// 	{ name: 'team2', points: 0 },
	// 	{ name: 'team3', points: 0 }
	// ]);

    // console.log(teams)
</script>

<div class="min-h-screen flex flex-col">

    <div class="flex w-1/2 mx-auto p-4">
        <div class="flex-initial font-bold px-4 py-2 m-2 mx-auto p-4" >
            <h1 class="text-8xl">Tech Trivia</h1>
        </div>
    </div>

	<!-- {#each teams as team}
		<TeamName name={team.name} points={team.points} />
	{/each} -->

    <div class="flex p-4 absolute right-5 top-1/2 transform -translate-y-1/2">
        <div class="flex items-center">
            <Button >Select a Game Set<ChevronDownOutline class="w-6 h-6 ms-2 text-white" /> </Button>
        </div>
        <Dropdown>
            <ul>
                {#each data.games as {slug}}
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

    <div class="fixed bottom-10 left-0 right-0 flex justify-center w-full">
        <button class="w-full md:w-auto relative hover:bg-blue-700 text-white font-bold py-2 px-4 text-5xl" onclick={startGame}>
            {#if startButtonText === ''}
            Please select a game
            {:else}
                {startButtonText}
            {/if}
        </button>
    </div>
</div>