<script lang="ts">
	import AccountStatus from './AccountStatus.svelte';

	let y: number;
	let scrollPrev = 0;
	const updateScroll = (scrollCurr: number) => {
		let temp = scrollCurr - scrollPrev;
		scrollPrev = scrollCurr;
		return temp;
	};
	$: scrollDiff = updateScroll(y);
</script>

<svelte:window bind:scrollY={y} />
<header style:top={scrollDiff > 0 ? 'auto' : '0'}>
	<a href="/">
		<img src="/favicon.png" alt="logo bookmarket" />
		<span>bookmarket</span>
	</a>
	<AccountStatus />
</header>

<style>
	header {
		width: 100%;
		height: 2.4rem;
		position: sticky;
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		gap: 0.2rem;
		background-color: #fff;
	}
	a {
		display: flex;
		align-items: center;
		text-decoration: none;
		gap: 0.2rem;
	}
	img {
		width: 1.2em;
		height: 1.2em;
	}
	span {
		font-size: 1.2rem;
		color: #f50;
	}
</style>
