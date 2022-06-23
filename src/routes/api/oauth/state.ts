import type { RequestHandler } from '@sveltejs/kit';
import { getOAuthURL as discord } from '$lib/oauth/discord';
import { getOAuthURL as facebook } from '$lib/oauth/facebook';
import { getOAuthURL as google } from '$lib/oauth/google';
import { states } from '$lib/database';

export const get: RequestHandler = async ({ url }) => {
	const provider = url.searchParams.get('provider');
	const redirectURI = url.searchParams.get('redirect_uri');

	if (!provider || !redirectURI) {
		return { status: 400, body: 'Missing URL search params' };
	}

	const state = crypto.randomUUID();

	let oauthURL: URL;
	if (provider === 'discord') {
		oauthURL = discord(state);
	} else if (provider === 'google') {
		oauthURL = google(state);
	} else if (provider === 'facebook') {
		oauthURL = facebook(state);
	} else {
		return { status: 403, body: 'Invalid provider' };
	}

	states.create({ redirectURI }, state);

	return {
		status: 200,
		body: {
			redirectURI: oauthURL.toString(),
		},
	};
};
