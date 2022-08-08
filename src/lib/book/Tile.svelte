<script lang="ts">
	import type { Book, Grade, Subject } from '@prisma/client';
	import { cover } from './LargeCover.svelte';

	export let book: Book;

	const gradeMap: { [K in Grade]: string } = {
		FIRST: 'Klasa 1, część 1',
		SECOND: 'Klasa 2, część 1',
		THIRD: 'Klasa 3, część 1',
		FOURTH: 'Klasa 4, część 1',
	};

	const subjectMap: { [K in Subject]: string } = {
		MATH: 'Matematyka',
		POLISH: 'Język polski',
		ENGLISH: 'Angielski',
		HISTORY: 'Historia',
		CHEMISTRY: 'Chemia',
		CIVICS: 'Wiedza o społeczeństwie',
		RUSSIAN: 'Język rosyjski',
		GERMAN: 'Język niemiecki',
		GEOGRAPHY: 'Geografia',
		COMPUTER_SCIENCE: 'Informatyka',
		PHYSICS: 'Fizyka',
		BIOLOGY: 'Biologia',
		ENTREPRENEURSHIP: 'Przedsiębiorczość',
		EDUCATION_FOR_SAFETY: 'Edukacja dla bezpieczeństwa',
	};
</script>

<div class="panel">
	<h6>{book.title}</h6>
	<div class="lower">
		<img
			src="https://cf-taniaksiazka.statiki.pl/images/large/{book.image}"
			alt="Okładka książki"
			width="200"
			height="300"
			on:click={() => ($cover = book.image)}
		/>
		<div class="info">
			<span>{subjectMap[book.subject]}</span>
			<span>{gradeMap[book.grade]}</span>
			<span>Podręcznik</span>
			<span>{book.isbn}</span>
			<slot />
		</div>
	</div>
</div>

<style>
	.panel {
		display: flex;
		flex-flow: column nowrap;
		padding: 0.4em;
		gap: 0.4em;
		border-radius: 0.4em;
		background-color: #fff;
		box-shadow: 0px 0px 0.4rem 0px rgba(0, 0, 0, 0.2);
	}
	h6 {
		display: block;
		margin: 0;
		padding: 0;
		font-size: 1rem;
		font-weight: normal;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.lower {
		display: flex;
		gap: 0.4em;
	}
	img {
		display: block;
		object-fit: contain;
		width: 4rem;
		min-height: 6em;
		height: 100%;
		cursor: pointer;
		transition: 0.2s;
	}
	img:hover {
		filter: brightness(0.9);
	}
	.info {
		flex: 1 1 0;
		display: flex;
		flex-flow: column;
		min-width: 0;
	}
	span {
		display: block;
		font-size: 0.8rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
