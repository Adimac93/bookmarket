import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '$lib/oauth/discord';

export const get: RequestHandler = async ({ url }) => {
	const provider = url.searchParams.get('provider');
	if (provider == 'discord') {
		const code: string = url.searchParams.get('code') || '';
		if (code) {
			await auth(code);
		}
	} else if (provider == 'facebook') {
		//TODO
	} else if (provider == 'google') {
		//TODO
	}

	return { status: 200 };
};
