<script>
	import { urlConstants } from '../../helper/urlConstants';
	import { onMount } from 'svelte';
	import FileDetailMain from './fileDetailMain.svelte';
	import FileDetailAttribute from './fileDetailAttribute.svelte';
	import FileDetailThumbnail from './fileDetailThumbnail.svelte';
	export let file,
		isLoadingItem,
		loadingError,
		updateFile,
		isUpdatingFile,
		updatingError,
		deleteFile,
		isDeletingFile,
		deletingError;

	let root;
	let isMounted;
	let isReady;

	$: {
		isReady = file && !isLoadingItem && !loadingError;
		if (isReady && isMounted) {
			initTabs();
		}
	}

	let tab;
	let tabs;
	let panel;

	function onTabClick(event) {
		console.log('onTabClick:clicked');
		// deactivate existing active tabs and panel
		for (let i = 0; i < tab.length; i++) {
			tab[i].classList.remove('active');
		}

		for (let i = 0; i < panel.length; i++) {
			panel[i].classList.remove('active');
		}

		// activate new tabs and panel
		event.target.classList.add('active');
		let classString = event.target.getAttribute('data-target');
		console.log(classString);
		document
			.getElementById('panels')
			.getElementsByClassName(classString)[0]
			.classList.add('active');
	}

	const initTabs = () => {
		console.log('initTabs:called');
		console.log('isMounted:value:' + isMounted);
		console.log('file:value:' + file);
		if (isMounted) {
			try {
				tabs = root.querySelectorAll('.tabs');
				tab = root.querySelectorAll('button.tab');
				panel = root.querySelectorAll('.tab-content');

				console.log('attaching event listeners');
				console.log('tab.length' + tab.length);

				for (let i = 0; i < tab.length; i++) {
					console.log('adding listener');
					tab[i].addEventListener('click', onTabClick);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	onMount(() => {
		isMounted = true;
	});
</script>

<div class="px-5" bind:this={root}>
	{#if isLoadingItem}
		<div class="px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded-lg">
			<p>Loading file ...</p>
		</div>
	{/if}
	{#if loadingError}
		<div class="px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg">
			<p>{loadingError}</p>
		</div>
	{/if}
	<!-- {#if file} -->
	<div class={isReady ? '' : 'hidden'}>
		<div class="bg-white">
			<nav class="tabs flex flex-col sm:flex-row">
				<button
					data-target="panel-1"
					class="tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none active"
				>
					Details
				</button>
				<button
					data-target="panel-2"
					class="tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
				>
					Attributes
				</button>
				<button
					data-target="panel-3"
					class="tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
				>
					Thumbnail
				</button>
			</nav>
		</div>
		<div id="panels" class="bg-white">
			<div class="panel-1 tab-content p-5 active">
				<FileDetailMain
					{file}
					{updateFile}
					{isUpdatingFile}
					{updatingError}
					{deleteFile}
					{isDeletingFile}
					{deletingError}
				/>
			</div>
			<div class="panel-2 tab-content p-5">
				<FileDetailAttribute />
			</div>
			<div class="panel-3 tab-content p-5">
				<FileDetailThumbnail />
			</div>
		</div>
	</div>

	<!-- {/if} -->
</div>

<style>
	.tab.active {
		@apply text-black border-b-2 font-medium border-black;
	}

	.tab-content {
		@apply hidden;
	}

	.tab-content.active {
		@apply block;
	}
</style>
