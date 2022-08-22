import type { RequestHandler } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';

export const GET: RequestHandler = async ({ params }) => {
	console.log(params.file);
	const file = await readFile(`images/${params.file}`, 'base64');
	const image = Buffer.from(file, 'base64');

	return new Response(image, {
		headers: {
			'Content-Type': 'image/png',
			'Content-Length': image.length + '',
		},
	});
};
