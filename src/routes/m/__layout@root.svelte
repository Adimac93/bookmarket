<script lang="ts">
	import { page } from '$app/stores';
	$: path = $page.url.pathname;
	$: href = path.replace(/\/\w+\/?$/, '');
</script>

<header>
	<a href="/m/">
		<img src="/favicon.png" alt="logo bookmarket" />
		<span>bookmarket</span>
	</a>
	<img src="/favicon.png" alt="przełącznik motywu" />
</header>

<main>
	<slot />
</main>

{#if href !== '/m'}
	<a {href} class="round">
		<img src="/m/chevron/left.svg" alt="strzałka w lewo" />
	</a>
{/if}

<nav>
	<ul>
		<li>
			<a href="/m/" class:active={path === '/m/'}>
				<img src="/m/bottom-nav/home.svg" alt="ikona strony głównej" /><span>Główna</span>
			</a>
		</li>
		<li>
			<a href="/m/kup" class:active={path.startsWith('/m/kup')}>
				<img src="/m/bottom-nav/shopping-basket.svg" alt="ikona sklepu" /><span>Kup</span>
			</a>
		</li>
		<li>
			<a href="/m/sprzedaj" class:active={path.startsWith('/m/sprzedaj')}>
				<img src="/m/bottom-nav/sell-book.svg" alt="ikona sprzedaży" /><span>Sprzedaj</span>
			</a>
		</li>
		<li>
			<a href="/m/konto" class:active={path.startsWith('/m/konto')}>
				<img src="/m/bottom-nav/user.svg" alt="ikona konta" /><span>Konto</span>
			</a>
		</li>
	</ul>
</nav>

<style>
	a.round {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background-color: #fff;
		position: fixed;
		bottom: 4.6rem;
		left: 1rem;
		border: none;
		cursor: pointer;
		margin: 0;
		padding: 0.5rem;
		display: flex;
		place-content: center;
	}
	main {
		padding-bottom: 3.6rem;
	}
	header {
		display: flex;
		width: 100%;
		position: sticky;
		align-items: center;
		padding: 0.4rem;
		gap: 0.2rem;
		background-color: #fff;
	}
	header a {
		display: flex;
		align-items: center;
		text-decoration: none;
		gap: 0.2rem;
	}
	header a img {
		width: 1.2em;
		height: 1.2em;
	}
	header span {
		font-size: 1.2rem;
		color: #f50;
	}
	header > img {
		width: 1.2em;
		height: 1.2em;
		margin-left: auto;
	}
	nav {
		width: 100%;
		height: 3.6rem;
		position: fixed;
		bottom: 0;
		background-color: #fff;
	}
	nav ul {
		display: flex;
		justify-content: stretch;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	nav li {
		display: block;
		flex: 1;
	}
	nav a {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: space-around;
		height: 100%;
		text-decoration: none;
		color: #444;
		padding: 0.2rem 0;
	}
	nav img {
		width: 1.8rem;
		height: 1.8rem;
	}
	nav span {
		font-size: 1rem;
	}
	nav a.active {
		color: #f50;
	}
</style>
