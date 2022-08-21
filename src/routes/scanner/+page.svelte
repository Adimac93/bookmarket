<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Html5QrcodeScanner,
		Html5QrcodeScanType,
		Html5QrcodeSupportedFormats,
	} from 'html5-qrcode';

	let lastResult: string, title: string, subtitle: string;
	async function onScanSuccess(decodedText: string, decodedResult: any) {
		if (decodedText !== lastResult) {
			lastResult = decodedText;

			console.log(`Scan result ${decodedText}`, decodedResult);
			const data = await (
				await fetch('/api/book/search', {
					method: 'post',
					body: JSON.stringify({ isbn: lastResult }),
				})
			).json();
			title = data.title || '';
			subtitle = data.subtitle || '';
			scanner.clear().then();
		}
	}
	let scanner: Html5QrcodeScanner;
	function generateScanner() {
		scanner = new Html5QrcodeScanner(
			'reader',
			{
				fps: 10,
				qrbox: { height: 400, width: 1000 },
				supportedScanTypes: [
					Html5QrcodeScanType.SCAN_TYPE_CAMERA,
					Html5QrcodeScanType.SCAN_TYPE_FILE,
				],
				formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
			},
			false,
		);
		scanner.render(onScanSuccess, () => {});
	}
	onMount(() => {
		scanner = new Html5QrcodeScanner(
			'reader',
			{
				fps: 30,
				qrbox: { height: 200, width: 500 },
				supportedScanTypes: [
					Html5QrcodeScanType.SCAN_TYPE_CAMERA,
					Html5QrcodeScanType.SCAN_TYPE_FILE,
				],
				formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
				experimentalFeatures: { useBarCodeDetectorIfSupported: true },
			},
			false,
		);
		scanner.render(onScanSuccess, () => {});
	});
</script>

<div><div id="reader" /></div>

{#if lastResult}
	<div class="container">
		<h1>ISBN:</h1>
		<div>{lastResult}</div>
		<h1>Title:</h1>
		<div>{title}</div>
		{#if subtitle}
			<h2>Subtitle:</h2>
			<div>{subtitle}</div>
		{/if}
		<br />
		<button
			on:click={() => {
				generateScanner();
				lastResult = '';
			}}>Scan another book</button
		>
	</div>
{/if}

<style>
	.container {
		width: fit-content;
		margin: 1em auto;
		padding: 1em;
		background-color: white;
		border-radius: 0.6em;
		box-shadow: 0px 0px 1em 0px rgba(0, 0, 0, 0.4);
	}
</style>
