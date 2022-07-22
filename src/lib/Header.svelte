<script lang="ts">
	import { page, session } from '$app/stores';
	$: redirect_uri = encodeURIComponent($page.url.href);
	$: url = $page.url.pathname;
</script>

<ul>
	<li><a class:active={url === '/'} href="/">Strona główna</a></li>
	<li><a class:active={url === '/sklep'} href="/sklep">Sklep</a></li>
	<li><a class:active={url === '/o-nas'} href="/o-nas">O nas</a></li>
	<li>{$session.user?.name ?? 'not logged in'}</li>
	{#if $session.user}
		<li><a class:active={url === '/logout'} href="/logout">Wyloguj się</a></li>
	{:else}
		<li>
			<a class:active={url === '/signup'} href="/signup">Załóż konto</a>
		</li>
		<li>
			<a class:active={url === '/login'} href="/login?redirect_uri={redirect_uri}">Zaloguj się</a>
		</li>
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
	li:nth-child(3) {
		margin-right: auto;
	}
	a {
		display: block;
		padding: 0.5em 1em;
		transition: 0.2s;
		text-decoration: none;
		color: black;
	}
	a.active {
		color: #f40;
	}
	a:hover {
		color: #00d;
	}
</style>
