import type { RequestHandler } from '@sveltejs/kit';
import { Provider, registerSession } from '$lib/oauth/common';
import { signups, db } from '$lib/database';
import discord from '$lib/oauth/discord';
import google from '$lib/oauth/google';
import facebook from '$lib/oauth/facebook';

export const get: RequestHandler = async ({ url }) => {
	const provider = url.searchParams.get('provider');
	const code = url.searchParams.get('code');

	if (!code) return {
		status: 200
	}

	if (provider === 'discord') {
		const discord_id = await discord(code);
		if (!discord_id) return { status: 500 };
		return logInOrSignUp((await db.user.findUnique({ where: { discord_id } }))?.id, discord_id, Provider.Discord);
	} else if (provider === 'google') {
		const google_email = await google(code);
		if (!google_email) return { status: 500 };
		return logInOrSignUp((await db.user.findUnique({ where: { google_id: google_email } }))?.id, google_email, Provider.Google);
	} else if (provider === 'facebook') {
		const facebook_id = await facebook(code);
		if (!facebook_id) return { status: 500 };
		return logInOrSignUp((await db.user.findUnique({ where: { facebook_id } }))?.id, facebook_id, Provider.Facebook);
	} else {
		return {
			status: 200
		}
	}
};

const logInOrSignUp = (id: string | undefined, provider_id: string, provider: Provider) => {
	if (id) {
		registerSession(id)
		return { status: 200 }
	};

	const signupId = crypto.randomUUID();
	signups[signupId] = { id: provider_id, provider };

	return {
		status: 303,
		headers: {
			Location: `/signup?id=${signupId}`
		}
	};
}