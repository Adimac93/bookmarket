import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const getSession: GetSession = async ({ locals }) => {
	return { isLoggedIn: !!locals.cookies.session_id };
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const response = await resolve(event);

	return response;
};
