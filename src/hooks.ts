import { db, sessions_class } from '$lib/database';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import dotenv from 'dotenv';

dotenv.config();

export const getSession: GetSession = async ({ locals }) => {
	const sessionId = locals.cookies.session_id;
	const id = sessions_class.get(sessionId);
	const user = id ? await db.user.findUnique({ where: { id }}) : null;
	return {
		isLoggedIn: !!locals.cookies.session_id,
		user
	};
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.cookies = parse(event.request.headers.get('cookie') || '');

	const response = await resolve(event);

	return response;
};
