<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import HamburgerMenu from '$lib/m/HamburgerMenu.svelte';
	import HamburgerMenuItem from '$lib/m/HamburgerMenuItem.svelte';
	import BookComponent from '$lib/m/BookComponent.svelte';
	import type { Book, UserBook } from '@prisma/client';

	export let books: (UserBook & {
		book: Book;
	})[] = [];
</script>

{#each books as userBook}
	<BookComponent book={userBook.book} />
{:else}
	<h1>Nie wystawiłeś jeszcze na sprzedaż żadnych książek.</h1>
{/each}

<HamburgerMenu title="Sprzedaj">
	<HamburgerMenuItem href="/sprzedaj/dodaj" text="Dodaj książkę" />
	<HamburgerMenuItem href="/sprzedaj/sprzedane" text="Sprzedane książki" />
	<HamburgerMenuItem href="/sprzedaj/dodaj/wybierz" text="Wybierz książkę z listy" />
</HamburgerMenu>
