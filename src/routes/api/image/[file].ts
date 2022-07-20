import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'node:fs';

export const get: RequestHandler = async ({ params }) => {
	console.log(params.file);
	const file = readFileSync(`images/${params.file}`, 'base64');
	const image = Buffer.from(file, 'base64');
	return {
		'Content-Type': 'image/png',
		'Content-Length': image.length,
		body: image,
	};
};
