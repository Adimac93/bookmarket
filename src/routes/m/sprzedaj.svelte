<script lang="ts">
	import HamburgerMenu from '$lib/m/HamburgerMenu.svelte';
	import HamburgerMenuItem from '$lib/m/HamburgerMenuItem.svelte';
</script>

<HamburgerMenu title="Dodaj książkę">
	<HamburgerMenuItem href="/m/sprzedaj/skanuj" text="Skanuj kod ISBN" />
	<HamburgerMenuItem href="/m/sprzedaj/wpisz" text="Wpisz kod ISBN" />
	<HamburgerMenuItem href="/m/sprzedaj/wybierz" text="Wybierz książkę z listy" />
</HamburgerMenu>
