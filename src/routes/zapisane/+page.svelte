<script lang="ts">
	import BookComponent from '$lib/m/BookComponent.svelte';
	import type { Book } from '@prisma/client';
	import type { KsiążkiSzkoły } from './_data';
	import Select from './_Select.svelte';
	import SelectLang from './_SelectLang.svelte';
	export let data: KsiążkiSzkoły;

	const profileMap: [string, string][] = data.profile.map(({ nazwa, opis }) => [nazwa, opis]);
	const językiMap = data.języki.map(({ nazwa }) => nazwa);

	let profil = -1;
	let język = -1;
	$: active = profil !== -1 && język !== -1;

	let isbnList: string[] = [];
	let books: Book[] = [];

	$: isbnList = [
		data.profile[profil]?.książki?.wymagane,
		data.profile[profil]?.książki?.opcjonalne,
		data.języki[język]?.książki?.wymagane,
		data.języki[język]?.książki?.opcjonalne,
	]
		.filter((k) => k !== undefined)
		.flat();

	$: isbnList.length &&
		fetch(`/api/book?isbn=${isbnList.join(',')}`)
			.then((r) => r.json())
			.then((r) => (books = r.books));
</script>

<div>
	<Select placeholder="Profil" bind:value={profil} choices={profileMap} />
	<SelectLang placeholder="Język obcy" bind:value={język} choices={językiMap} />
	<ul>
		{#each books as book}
			<BookComponent {book} />
		{/each}
	</ul>
	<button
		class:active
		disabled={!active}
		on:click={() =>
			fetch('/zapisane/__data.json', {
				method: 'post',
				body: JSON.stringify({ books: isbnList }),
			})}>Stwórz zamówienie</button
	>
</div>

<style>
	div {
		display: flex;
		flex-flow: column nowrap;
		padding: 0.5rem;
		gap: 0.5rem;
	}
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
		margin: 0;
		padding: 0;
		gap: 0.2rem;
		list-style: none;
	}
	button {
		appearance: none;
		border: none;
		margin: 0;
		padding: 0.8rem;
		font-size: 1rem;
		border-radius: 0.5rem;
		background-color: #aaa;
		color: #000;
		transition: 0.4s;
		cursor: not-allowed;
	}
	button.active {
		background-color: #f50;
		color: #fff;
		cursor: pointer;
	}
</style>
