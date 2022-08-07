<script lang="ts">
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
