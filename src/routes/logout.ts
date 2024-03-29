import type { RequestHandler } from '@sveltejs/kit';
import { serialize } from 'cookie';
import { session } from '$lib/session';

export const get: RequestHandler = async ({ locals }) => {
	if (locals.user) {
		session.logOut(locals.user.sessionID);
	}

	return {
		status: 303,
		headers: {
			'set-cookie': serialize('session_id', '', { maxAge: 0 }),
			location: '/login',
		},
	};
};
