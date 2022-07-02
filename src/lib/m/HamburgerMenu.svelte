<script lang="ts">
	export let title: string;
	let hidden = true;
</script>

<button class="round" on:click={() => (hidden = false)}>
	<img src="/chevron/up.svg" alt="strzałka w górę" />
</button>

<div class:hidden>
	<header>
		<span>{title}</span>
		<button on:click={() => (hidden = true)}>
			<img src="/x.svg" alt="x-zamknij" />
		</button>
	</header>
	<ul>
		<slot />
	</ul>
</div>

<style>
	button.round {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background-color: #fff;
		position: fixed;
		bottom: 4.6rem;
		right: 1rem;
	}
	div {
		width: 100vw;
		min-height: 8rem;
		height: fit-content;
		max-height: 50vh;
		background-color: #fff;
		border-radius: 2rem 2rem 0 0;
		position: fixed;
		bottom: 3.6rem;
		font-size: 1.3rem;
		padding: 0.5rem;
		transition: bottom 0.5s;
	}
	div.hidden {
		bottom: -100vw;
	}
	header {
		display: flex;
	}
	span {
		flex: 1;
		text-align: center;
		padding: 0.5rem;
	}
	button {
		appearance: none;
		background-color: transparent;
		background-repeat: no-repeat;
		border: none;
		cursor: pointer;
		margin: 0;
		padding: 0.5rem;
		display: flex;
		place-content: center;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>
