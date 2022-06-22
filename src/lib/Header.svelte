<script lang="ts">
	import { page, session } from '$app/stores';
	$: redirect_uri = encodeURIComponent($page.url.href);
</script>

<ul>
	<li><a href="/">Strona główna</a></li>
	<li><a href="/sklep">Sklep</a></li>
	<li><a href="/o-nas">O nas</a></li>
	{#if !$session.isLoggedIn}
		<li><a href="/login?redirect_uri={redirect_uri}">Zaloguj się</a></li>
		<li><a href="/signup">Załóż konto</a></li>
	{:else}
		<li />
		<li><a href="/logout">Wyloguj się</a></li>
	{/if}
</ul>

<style>
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		background-color: white;
	}
	li:nth-last-child(2) {
		margin-left: auto;
	}
	a {
		display: block;
		padding: 0.5em 1em;
		transition: 0.2s;
		text-decoration: none;
		color: black;
	}
	a:hover {
		color: #00d;
	}
</style>
