<script>
	import { onMount } from 'svelte';
	import ProfileMain from './profileMain.svelte';

	let root;
	let isMounted;
	let isReady;

	export let profile, updateProfile, isLoadingItem, loadingError, isUpdatingItem, updatingError;

	$: {
		isReady = profile && !isLoadingItem && !loadingError;
		if (isReady && isMounted) {
			initTabs();
		}
	}

	let tab;
	let tabs;
	let panel;

	function onTabClick(event) {
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

		document
			.getElementById('panels')
			.getElementsByClassName(classString)[0]
			.classList.add('active');
	}

	const initTabs = () => {
		if (isMounted) {
			try {
				tabs = root.querySelectorAll('.tabs');
				tab = root.querySelectorAll('button.tab');
				panel = root.querySelectorAll('.tab-content');

				for (let i = 0; i < tab.length; i++) {
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

<div class="h-screen px-5" bind:this={root}>
	<div class={`${isReady ? '' : 'hidden'} border-2`}>
		<div class="bg-white">
			<nav class="tabs flex flex-col sm:flex-row">
				<button
					data-target="panel-1"
					class="tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none active"
				>
					Details
				</button>
			</nav>
		</div>
		<div id="panels" class="bg-white">
			<div class="panel-1 tab-content p-5 active">
				<ProfileMain {profile} {updateProfile} {isUpdatingItem} {updatingError} />
			</div>
		</div>
	</div>
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
