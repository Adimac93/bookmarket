import type { RequestHandler } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';
export const post: RequestHandler = async ({ request }) => {
	const data = await request.json();
	if (!data.images) return { status: 400 };
	const files = data.images as Array<string>;
	for (let file of files) {
		await writeFile(`images/${crypto.randomUUID()}.png`, file, 'base64');
	}
	return { status: 200 };
};
