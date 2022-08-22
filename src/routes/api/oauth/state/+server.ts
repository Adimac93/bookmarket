import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getOAuthURL as discord } from '$lib/oauth/discord';
import { getOAuthURL as facebook } from '$lib/oauth/facebook';
import { getOAuthURL as google } from '$lib/oauth/google';
import { states } from '$lib/database';

export const GET: RequestHandler = async ({ url }) => {
	const provider = url.searchParams.get('provider');
	const redirectURI = url.searchParams.get('redirect_uri');

	if (!provider || !redirectURI) {
		throw error(400, 'Missing URL search params');
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
		throw error(403, 'Invalid provider');
	}

	states.create({ redirectURI }, state);

	return json({
		redirectURI: oauthURL.toString(),
	});
};
