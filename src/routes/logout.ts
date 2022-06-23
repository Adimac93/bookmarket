import type { RequestHandler } from '@sveltejs/kit';
import { serialize } from 'cookie';
import { sessions_class } from '$lib/database';

export const get: RequestHandler = async ({ locals }) => {
	sessions_class.delete(locals.cookies.session_id);

	return {
		status: 303,
		headers: {
			'set-cookie': serialize('session_id', '', { maxAge: 0 }),
			location: '/login',
		},
	};
};
