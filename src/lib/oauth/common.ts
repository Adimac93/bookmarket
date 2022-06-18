import { serialize } from 'cookie';
import { sessions } from '$lib/database';

export enum Provider {
	Google = 'gg',
	Facebook = 'fb',
	Discord = 'dc'
}

export function registerSession(user_id: string) {
	const sessionId = crypto.randomUUID();
	sessions[sessionId] = user_id;

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
