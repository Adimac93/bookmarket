import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import { serialize } from 'cookie';
import { db, sessions_class } from '$lib/database';
import discord from '$lib/oauth/discord';
import facebook from '$lib/oauth/facebook';
import google from '$lib/oauth/google';

export const get: RequestHandler = async ({ url }) => {
	const provider = url.searchParams.get('provider');
	const code = url.searchParams.get('code');

	if (!code || !provider) {
		return { status: 400, body: 'Missing URL search params' };
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

	const existingUser = await db.user.findUnique({ where });

	if (existingUser) {
		return {
			status: 303,
			headers: {
				'Set-Cookie': serialize('session_id', sessions_class.create(existingUser.id), {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: true,
					maxAge: 60 * 60 * 24 * 1
				}),
				Location: '/sklep'
			}
		};
	}

	const createdUser = await db.user.create({ data: { ...where, name: 'Test' } });

	return {
		status: 303,
		headers: {
			'Set-Cookie': serialize('session_id', sessions_class.create(createdUser.id), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60 * 24 * 1
			}),
			Location: '/signup'
		}
	};
};
