<script lang="ts">
	import LargeCover from '$lib/book/LargeCover.svelte';
	import type { ShadowData } from '.';

	export let offers: ShadowData['offers'];
</script>

<ul>
	{#each offers as offer}
		<li>
			<a href="/kupujacy/{offer.school?.id ?? offer.user?.id}">
				{offer.school?.abbr ?? offer.user?.name}
				{offer.count}
			</a>
		</li>
	{/each}
</ul>

<LargeCover />
