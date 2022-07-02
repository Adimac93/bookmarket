<script lang="ts">
	export let href: string;
	export let text: string;
</script>

<li>
	<a {href}>
		<span>{text}</span>
		<img src="/chevron/right.svg" alt="strzałka w prawo" />
	</a>
</li>

<style>
	li {
		display: block;
		width: 100%;
		border-top: 1px solid #ddd;
	}
	li:last-child {
		border-bottom: 1px solid #ddd;
	}
	a {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		text-decoration: none;
		color: #000;
		font-size: 1.2rem;
	}
	img {
		margin-left: auto;
	}
</style>
