<script lang="ts">
	import Accordion from './_Accordion.svelte';
	import AccordionDesc from './_AccordionDesc.svelte';
	import { ALOPB, cities, cityDataList, regionMap, regions } from './_data';

	import Select from './_Select.svelte';

	let value: string;
	ALOPB;
	Object.entries(ALOPB.options);

	let region: string = '';
	let current = 1;

	$: miasta = regionMap[region] ?? [];
</script>

<!-- <Select
	id="region"
	label="Województwo"
	choices={regions}
	on:select={(event) => alert(event.detail)}
/> -->
<!-- <Select
	id="city"
	label="Miejscowość"
	choices={['Białystok']}
	on:select={(event) => alert(event.detail)}
/>
{#each Object.entries(ALOPB.options) as [name, option], id}
	<Select id={id.toString()} label={name} choices={Object.keys(option)} />
{/each} -->

<AccordionDesc id={0} bind:current label="Miasto" choices={cityDataList} />
<Accordion id={1} bind:current bind:value={region} label="Województwo" choices={regions} />
<Accordion id={2} bind:current label="Miasto" choices={miasta} />
