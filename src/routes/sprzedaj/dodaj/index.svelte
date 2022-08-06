<script lang="ts">
	import BookComponent from '$lib/m/BookComponent.svelte';

	import { type Book, Grade, Subject } from '@prisma/client';
	import { onMount } from 'svelte';

	let isbn = '';
	let title = '';
	let grade: Grade;
	let subject: Subject;

	let books: Book[] = [];
	$: booksFiltered = books.filter(
		(book) =>
			book.isbn.includes(isbn) &&
			book.title.toLowerCase().includes(title.toLowerCase()) &&
			(!grade || book.grade === grade) &&
			(!subject || book.subject === subject),
	);

	onMount(async () => {
		books = await fetch('/sklep/__data.json')
			.then((r) => r.json())
			.then((r) => r.books);
		console.log(books);
	});
</script>

<form>
	<label>
		<span>Kod ISBN</span>
		<input type="text" bind:value={isbn} placeholder="9788326739620" />
	</label>
	<label>
		<span>Klasa</span>
		<select bind:value={grade} placeholder="Wybierz klasę...">
			<option />
			{#each Object.keys(Grade) as gradeName}
				<option>{gradeName}</option>
			{/each}
		</select>
	</label>
	<label>
		<span>Przedmiot</span>
		<select bind:value={subject} placeholder="Wybierz przedmiot...">
			<option />
			{#each Object.keys(Subject) as subjectName}
				<option>{subjectName}</option>
			{/each}
		</select>
	</label>
	<label>
		<span>Tytuł</span>
		<input type="text" bind:value={title} placeholder="Oblicza Geografii 2" />
	</label>
</form>

<ul>
	{#each booksFiltered as book}
		<BookComponent {book} />
	{/each}
</ul>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
		margin: 0;
		padding: 0.2rem;
		gap: 0.2rem;
		list-style: none;
	}
	form {
		display: flex;
		flex-flow: column;
		padding: 0.5rem;
		gap: 0.5rem;
		font-size: 1.1rem;
		position: sticky;
		top: 0;
		background-color: #fff;
	}
	label {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	span {
		display: block;
		flex: 0 1 40%;
	}
	input,
	select {
		display: block;
		width: 0;
		flex: 0 1 60%;
		font-size: 1rem;
		padding: 0.2em;
		background-color: #e8e8e8;
		box-shadow: none;
		/* border: 2px solid #444; */
		border: none;
		border-radius: 0.3em;
		outline: none;
	}
	/* select::after {
		content: '';
		width: 0.8em;
		height: 0.5em;
		background-color: #444;
		clip-path: polygon(5% 45%, 50% 90%, 95% 45%, 100% 50%, 50% 100%, 0 50%);
	} */
	input:focus,
	select:focus {
		outline: 2px solid #7af;
	}
</style>
