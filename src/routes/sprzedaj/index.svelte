<script lang="ts">
	import HamburgerMenu from '$lib/m/HamburgerMenu.svelte';
	import HamburgerMenuItem from '$lib/m/HamburgerMenuItem.svelte';
	import BookComponent from '$lib/m/BookComponent.svelte';
	import type { BookCopy, BookWithCondition, Book as BookType } from '@prisma/client';

	export let books: (BookCopy & {
		book_with_condition: BookWithCondition & {
			book: BookType;
		};
	})[] = [];
</script>

{#each books as book}
	<BookComponent book={book.book_with_condition.book} />
{:else}
	<h1>Nie wystawiłeś jeszcze na sprzedaż żadnych książek.</h1>
{/each}

<HamburgerMenu title="Sprzedaj">
	<HamburgerMenuItem href="/sprzedaj/dodaj" text="Dodaj książkę" />
	<HamburgerMenuItem href="/sprzedaj/sprzedane" text="Sprzedane książki" />
	<HamburgerMenuItem href="/sprzedaj/dodaj/wybierz" text="Wybierz książkę z listy" />
</HamburgerMenu>
