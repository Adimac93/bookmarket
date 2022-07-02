<script lang="ts">
	import type { Book, Grade, Subject } from '@prisma/client';

	export let book: Book;

	const gradeMap: { [K in Grade]: string } = {
		FIRST: 'Klasa 1',
		SECOND: 'Klasa 2',
		THIRD: 'Klasa 3',
		FOURTH: 'Klasa 4',
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
	};
</script>

<li class="book">
	<h1>{book.title}</h1>
	<div class="main">
		<div class="cover">
			<img
				src="https://cf-taniaksiazka.statiki.pl/images/large/{book.image}"
				alt="Okładka książki"
				width="200"
				height="300"
			/>
		</div>
		<div class="info">
			<span>{book.id}</span>
			<span>{gradeMap[book.grade]}</span>
			<span>{subjectMap[book.subject]}</span>
			<a href="/sprzedaj/dodaj/potwierdz?isbn={book.id}" class="confirm">
				<span>Wybierz</span>
				<img src="/chevron/right.svg" alt="strzałka w prawo" />
			</a>
		</div>
	</div>
</li>

<style>
	a {
		text-decoration: none;
		margin: 0;
		padding: 0;
		border: none;
		cursor: pointer;
	}
	.book {
		height: fit-content;
		padding: 0.4rem;
		border-radius: 0.4rem;
		background-color: #fff;
		transition: 0.2s;
	}
	h1 {
		display: block;
		margin: 0;
		margin-bottom: 0.2rem;
		font-size: 1rem;
		font-weight: normal;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.main {
		display: flex;
		gap: 0.4em;
	}
	.cover {
		flex: 0 0 4.8em;
		height: 7.2em;
		cursor: pointer;
		transition: 0.2s;
	}
	.cover:hover {
		opacity: 90%;
	}
	.cover > img {
		display: block;
		margin: auto;
		object-fit: contain;
		height: 100%;
		width: 100%;
	}
	.info {
		flex: 1 1 0;
		display: flex;
		flex-flow: column;
		gap: 0.1rem;
		min-width: 0;
	}
	a.confirm {
		padding: 0.6rem;
		border-radius: 0.4rem;
		background-color: #f50;
		color: #fff;
		margin-top: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	a.confirm img {
		height: 1em;
		filter: invert(1);
		flex: 0 0 1em;
	}
	a.confirm span {
		margin: auto;
		font-size: 0.8rem;
	}
	span {
		display: block;
		font-size: 0.8rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
