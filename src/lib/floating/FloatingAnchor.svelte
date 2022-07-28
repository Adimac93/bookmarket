<script lang="ts">
    export let href: string;
</script>

<a {href}>
    <slot />
</a>

<style>
    a {
        appearance: none;
        border: none;
        border-radius: 50%;
		cursor: pointer;
        height: 3.2rem;
        width: 3.2rem;
        margin: 0;
		padding: 0.4rem;
		display: flex;
		place-content: center;
        position: fixed;
        bottom: 3.6rem;
        right: 0.6rem;
        background-color: #f50;
    }
</style>