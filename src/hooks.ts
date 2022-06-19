import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const getSession: GetSession = async ({ request }) => {
	const sessionId = cookie.parse(request.headers.get('Cookie') || '')['session_id'] || '';
	return { isLoggedIn: !!sessionId };
};
