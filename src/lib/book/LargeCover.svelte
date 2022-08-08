<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	export const cover = writable('');
</script>

<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { fade } from 'svelte/transition';

	afterNavigate(() => ($cover = ''));
</script>

{#if $cover}
	<div transition:fade={{ duration: 100 }} on:click={() => ($cover = '')}>
		<img
			on:click|stopPropagation
			src="https://cf-taniaksiazka.statiki.pl/images/large/{$cover}"
			alt="Duża okładka książki"
		/>
	</div>
{/if}

<style>
	div {
		position: fixed;
		top: 0;
		bottom: 3rem;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.6);
	}
	img {
		display: block;
		max-height: 90%;
		max-width: 90%;
	}
</style>
