import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '$lib/oauth/discord';
import { Provider } from '$lib/oauth/common';
import { serialize } from 'cookie';
import { sessions, signups, db } from '$lib/database';

export const get: RequestHandler = async ({ url }) => {
	const provider = url.searchParams.get('provider');
	if (provider == 'discord') {
		const code: string = url.searchParams.get('code') || '';
		if (code) {
			const discord_id = await auth(code);
			if (!discord_id) return { status: 403 };

			let user = await db.user.findFirst({ where: { discord_id } });
			if (!user) {
				console.log("User isn't registered");
				const signupId = crypto.randomUUID();
				signups[signupId] = { id: discord_id, provider: Provider.Discord };
				return {
					status: 303,
					headers: {
						Location: '/signup',
						'Set-Cookie': serialize(
							'session_id',
							JSON.stringify({ id: signupId, provider: Provider.Discord }),
							{
								path: '/',
								httpOnly: true,
								sameSite: 'strict',
								secure: true
							}
						)
					}
				};
			}
			const sessionId = crypto.randomUUID();
			sessions[sessionId] = user.id;
			return {
				status: 200,
				headers: {
					'Set-Cookie': serialize(
						'session_id',
						JSON.stringify({ id: sessionId, provider: Provider.Discord }),
						{
							path: '/',
							httpOnly: true,
							sameSite: 'strict',
							secure: true,
							maxAge: 60 * 60 * 24 * 1
						}
					)
				},
				body: {
					message: 'Successfully signed in'
				}
			};
		}
	} else if (provider == 'facebook') {
		//TODO
	} else if (provider == 'google') {
		//TODO
	}

	return { status: 200 };
};
