import { sessions } from '$lib/database';
import { serialize, parse } from 'cookie';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request }) => {
	const cookie = parse(request.headers.get('Cookie') || '');
	delete sessions[cookie['session_id']];

	return {
		status: 303,
		headers: { Location: '/login', 'Set-Cookie': serialize('session_id', '', { maxAge: 0 }) }
	};
};
