import { sessions } from '$lib/database';
import { serialize, parse } from 'cookie';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request }) => {
	const cookie = parse(request.headers.get('Cookie') || '');
	if (!sessions[cookie['session_id']]) {
		return { status: 503 };
	}
	delete sessions[cookie['session_id']];

	return {
		status: 303,
		headers: { Location: '/login', 'Set-Cookie': serialize('session_id', '', { maxAge: 0 }) }
	};
};
