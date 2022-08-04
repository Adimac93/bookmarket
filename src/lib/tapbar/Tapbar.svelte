<script lang="ts">
	import TapbarIcon from './TapbarIcon.svelte';
</script>

<nav>
	<ul>
		<TapbarIcon
			name="Zapisane"
			href="/zapisane"
			src="/tapbar/bookmark.svg"
			alt="ikona wybierania książek do kupienia"
		/>
		<TapbarIcon
			name="Zamówione"
			href="/zamowione"
			src="/tapbar/checklist.svg"
			alt="ikona zarezerwowanych książek"
		/>
		<TapbarIcon
			name="Moje książki"
			href="/moje-ksiazki"
			src="/tapbar/repo.svg"
			alt="ikona moich książek"
		/>
		<TapbarIcon
			name="Na sprzedaż"
			href="/sprzedaj"
			src="/tapbar/repo-push.svg"
			alt="ikona książek wystawionych na sprzedaż"
		/>
		<TapbarIcon
			name="Sprzedane"
			href="/sprzedane"
			src="/tapbar/history.svg"
			alt="ikona sprzedanych książek"
		/>
	</ul>
</nav>

<style>
	nav {
		width: 100%;
		height: 3rem;
		position: fixed;
		bottom: 0;
		background-color: #fff;
	}
	ul {
		display: flex;
		flex-flow: row nowrap;
		justify-content: stretch;
		overflow: scroll;
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>
