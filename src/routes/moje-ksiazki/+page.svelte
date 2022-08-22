<script lang="ts">
	throw new Error(
		'@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)',
	);

	import type { Book, UserBook } from '@prisma/client';
	import BookCard from './BookCard.svelte';
	export let books: (UserBook & { book: Book })[];
	export let info: string;
</script>

{#if books}
	{#each books as book}
		<BookCard userBook={book} />
	{:else}
		<h1>No ni mosz książek</h1>
	{/each}
{:else}
	<h1>{info}</h1>
{/if}
