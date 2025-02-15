<script>
    import { base } from '$app/paths';
    let { data } = $props();

    import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
</script>

<div class="min-h-screen flex flex-col">

    <div class="flex w-1/2 mx-auto p-4">
        <div class="flex-initial font-bold px-4 py-2 m-2 mx-auto p-4" >
            <h1 class="text-8xl">Tech Trivia</h1>
        </div>
    </div>


    <div class="flex p-4 absolute right-5 top-1/2 transform -translate-y-1/2">
        <Button >Select a Game Set<ChevronDownOutline class="w-6 h-6 ms-2 text-white" /> </Button>
        <Dropdown>
            <ul>
                {#each data.games as { slug }}
                    <li><a href="{base}/board/{slug}">{slug}</a></li>
                {/each}
        </ul>
        </Dropdown>
    </div>
    

    <div class="fixed bottom-10 left-0 right-0 flex justify-center w-full">
      <button class="w-full md:w-auto relative hover:bg-blue-700 text-white font-bold py-2 px-4">
        <a href="/board/game" class="text-5xl">Start Game</a>
      </button>
    </div>
</div>

