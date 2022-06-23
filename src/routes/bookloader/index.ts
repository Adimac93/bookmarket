import type { RequestHandler } from '@sveltejs/kit';
import { generateSet } from '$lib/store/bookLoader';

export const get: RequestHandler = async ({ url }) => {
	await generateSet('second');
	return { status: 200 };
};
