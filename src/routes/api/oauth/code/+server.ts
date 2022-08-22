import type { Prisma } from '@prisma/client';
import { error, type RequestHandler } from '@sveltejs/kit';
import { serialize } from 'cookie';
import { db } from '$lib/database';
import { handleOAuthCode as discord } from '$lib/oauth/discord';
import { handleOAuthCode as facebook } from '$lib/oauth/facebook';
import { handleOAuthCode as google } from '$lib/oauth/google';
import { states } from '$lib/database';
import { session } from '$lib/session';

export const GET: RequestHandler = async ({ url, locals, request }) => {
	const provider = url.searchParams.get('provider');
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	if (!provider || !code || !state) {
		throw error(400, 'Missing URL search params');
	}

	const stateData = states.get(state);
	if (!stateData) {
		throw error(403, 'Invalid state param');
	}

	const where: Omit<Prisma.UserWhereUniqueInput, 'id'> = {};

	if (provider === 'discord') {
		where.discordId = await discord(code);
	} else if (provider === 'google') {
		where.googleId = await google(code);
	} else if (provider === 'facebook') {
		where.facebookId = await facebook(code);
	} else {
		throw error(403, 'Invalid provider');
	}

	if (!where.discordId && !where.googleId && !where.facebookId) {
		throw error(403, 'Authentication error');
	}

	let location = stateData.redirectURI;
	let user = await db.user.findUnique({ where });

	if (!user) {
		location = '/signup';
		user = await db.user.create({
			data: {
				...where,
				base: { create: {} },
			},
		});
	}

	const maxAge = 60 * 60 * 24 * 1;
	const sessionID = session.logIn(user.id, maxAge);
	locals.user = {
		id: user.id,
		sessionID,
	};

	return new Response(undefined, {
		status: 303,
		headers: {
			'set-cookie': serialize('session_id', sessionID, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
				maxAge,
			}),
			location,
		},
	});
};
