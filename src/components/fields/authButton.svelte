<script>
	import AnimatedButton from './animatedButton.svelte';
	import BasicButton from './basicButton.svelte';

	export let title;
	export let callInProgress;
	export let width = 'w-96';
	export let type = 'submit';
	export let onClick = undefined;
</script>

<div class="flex items-center justify-between mb-4">
	{#if !callInProgress}
		<BasicButton {width} {title} {type} {onClick} />
	{/if}
	{#if callInProgress}
		<AnimatedButton {width} />
	{/if}
</div>
