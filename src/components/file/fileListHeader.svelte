<script>
	export let reloadList;
	export let launchCreateFile;

	import Fa from 'svelte-fa';
	import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="flex flex-row justify-between px-5">
	<div class="flex space-x-4">
		<h2 class="font-bold text-3xl">My Files</h2>
	</div>
	<div class="flex items-center space-x-6">
		<div>
			<a href={'#'} on:click={reloadList}>
				<Fa icon={faSyncAlt} size="lg" />
			</a>
		</div>
		<div>
			<a
				class="bg-black text-white text-sm py-2 px-6 rounded"
				href={'#'}
				on:click={launchCreateFile}
			>
				Upload File
			</a>
		</div>
	</div>
</div>

<!-- <div class="w-full flex flex-row justify-between">
	
</div> -->
