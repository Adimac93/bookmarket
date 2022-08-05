<script lang="ts">
	import { page, session } from '$app/stores';

	$: redirect_uri = encodeURIComponent($page.url.href);
	let clicked = false;
</script>

{#if $session.user}
	<div class:clicked>
		<button on:click={() => (clicked = !clicked)}>
			{$session.user.name ?? 'Konto'}
			<img class="chevron" src="/chevron/down.svg" alt="strzałka w dół" />
		</button>
		<ul class="dropdown">
			<li>
				<a href="/m/ustawienia">Ustawienia konta</a>
			</li>
			<li>
				<a href="/m/warunki-uzytkowania">Warunki użytkowania</a>
			</li>
			<li>
				<a href="/m/polityka-prywatnosci">Polityka prywatności</a>
			</li>
			<li>
				<a href="/logout">Wyloguj się</a>
			</li>
		</ul>
	</div>
{:else}
	<a href="/login?redirect_uri={redirect_uri}">Zaloguj się</a>
{/if}

<style>
	a {
		display: flex;
		text-decoration: none;
		color: #444;
		/* color: #fff;
		background-color: #f50;
		border-radius: 0.4rem; */
		/* padding: 0.2rem 0.4rem; */
		padding: 0.6rem;
		/* margin: 0.2rem; */
		place-content: center;
		place-items: center;
	}
	div {
		position: relative;
		height: 100%;
	}
	button {
		display: flex;
		flex-flow: row nowrap;
		justify-content: end;
		align-items: center;
		appearance: none;
		border: none;
		background-color: transparent;
		font-size: 1rem;
		padding: 0.6rem;
	}
	img.chevron {
		width: 1.1rem;
		height: 1.1rem;
		transition: transform 0.4s;
	}
	.clicked img.chevron {
		transform: rotate(-180deg);
	}
	ul {
		position: absolute;
		right: 0;
		display: none;
		margin: 0;
		padding: 0.2rem;
		list-style: none;
		min-width: 100%;
		background-color: #fff;
	}
	.clicked ul {
		display: block;
	}
	li a {
		white-space: nowrap;
		padding: 0.2rem;
	}
</style>
