<script>
	let { name, points = $bindable(0), ...props } = $props();
</script>

<div 
	class="m-auto rounded-3xl w-1/5 border-4 border-solid border-black bg-gray-500 py-2 sm:text-lg md:text-xl lg:text-2xl text-black text-center"
>
	{name}:
	<input
		class="w-1/3 bg-gray-400 rounded-xl text-right"
		type="number"
		min="0"
		step="100"
		bind:value={points}
		{...props}
	/>pts
  </div>