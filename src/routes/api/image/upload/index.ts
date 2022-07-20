import type { RequestHandler } from '@sveltejs/kit';
import { writeFileSync } from 'node:fs';
export const post: RequestHandler = async ({ request }) => {
	const data = await request.json();
	if (!data.images) return { status: 400 };
	const files = data.images as Array<string>;
	for (let file of files) {
		writeFileSync(`images/${crypto.randomUUID()}.png`, file, 'base64');
	}
	return { status: 200 };
};
