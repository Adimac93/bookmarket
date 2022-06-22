import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import { serialize } from 'cookie';
import { db, sessions_class } from '$lib/database';
import { handleOAuthCode as discord } from '$lib/oauth/discord';
import { handleOAuthCode as facebook } from '$lib/oauth/facebook';
import { handleOAuthCode as google } from '$lib/oauth/google';
import { states } from '$lib/database';

export const get: RequestHandler = async ({ url, locals, request }) => {
	const provider = url.searchParams.get('provider');
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	if (!provider || !code || !state) {
		return { status: 400, body: 'Missing URL search params' };
	}

	const stateData = states.get(state);
	if (!stateData) {
		return { status: 403, body: 'Invalid state param' };
	}

	const where: Prisma.UserWhereUniqueInput = {};

	if (provider === 'discord') {
		where.discord_id = await discord(code);
	} else if (provider === 'google') {
		where.google_id = await google(code);
	} else if (provider === 'facebook') {
		where.facebook_id = await facebook(code);
	} else {
		return { status: 403, body: 'Invalid provider' };
	}

	if (!where.discord_id && !where.google_id && !where.facebook_id) {
		return { status: 403, body: 'Authentication error' };
	}

	let Location = stateData.redirectURI;
	let user = await db.user.findUnique({ where });

	if (!user) {
		Location = '/signup';
		user = await db.user.create({ data: { name: 'Użytkownik', ...where } });
	}

	const session_id = sessions_class.create(user.id);

	return {
		status: 303,
		headers: {
			'set-cookie': serialize('session_id', session_id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60 * 24 * 1
			}),
			Location
		}
	};
};
