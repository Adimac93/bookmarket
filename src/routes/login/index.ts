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
						Location: `/signup?id=${signupId}`
					}
				};
			}
			const sessionId = crypto.randomUUID();
			sessions[sessionId] = user.id;

			return {
				status: 200,
				headers: {
					'Set-Cookie': serialize('session_id', sessionId, {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						secure: true,
						maxAge: 60 * 60 * 24 * 1
					})
				},
				body: {
					message: 'Successfully signed in'
				}
			};
		}
	} else if (provider == 'facebook') {
		const code = url.searchParams.get('code');

		if (code) {
			const token_response = await fetch(
				`https://graph.facebook.com/v14.0/oauth/access_token?client_id=${331682405650576}&redirect_uri=${encodeURI(
					`https://localhost:3000/login?provider=facebook`
				)}&client_secret=${'2b90b7b4894df78d6b3f53e387a03c87'}&code=${code}`
			).then((r) => r.json());

			const token = token_response.access_token;

			console.log(token);

			const data_response = await fetch(
				`https://graph.facebook.com/debug_token?input_token=${token}&access_token=331682405650576|2b90b7b4894df78d6b3f53e387a03c87`
			).then((r) => r.json());

			console.log(data_response);

			const id = data_response.user_id;
		}
	} else if (provider == 'google') {
		//TODO
	}

	return { status: 200 };
};
