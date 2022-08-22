import { error, type RequestHandler } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';
export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.images) {
		throw error(400);
	}

	const files = data.images as Array<string>;
	for (let file of files) {
		await writeFile(`images/${crypto.randomUUID()}.png`, file, 'base64');
	}
	return new Response(undefined);
};
