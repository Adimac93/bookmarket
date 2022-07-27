<script lang="ts">
	import { page } from '$app/stores';
	$: path = $page.url.pathname;

    export let name: string;
    export let href: string;
    export let src: string;
    export let alt: string;
</script>

<li>
	<a {href} class:active={path.startsWith(`/m/${href}`)}>
		<img {src} {alt} /><span>{name}</span>
	</a>
</li>

<style>
    li {
		display: block;
		flex: 1 0 4rem;
	}
	a {
		height: 100%;
		text-decoration: none;
		color: #444;
		padding: 0.2rem 0;
	}
	img {
        display: block;
        margin: 0.2rem auto 0.1rem auto;
		width: 1.4rem;
		height: 1.4rem;
	}
	span {
        display: block;
		font-size: 0.7rem;
        text-align: center;
	}
	a.active {
		color: #f50;
	}
</style>