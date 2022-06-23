import { sessions } from '$lib/database';
import { serialize, parse } from 'cookie';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	sessions_class.delete(locals.cookies.session_id);

	return {
		status: 303,
		headers: { Location: '/login', 'Set-Cookie': serialize('session_id', '', { maxAge: 0 }) }
	};
};
