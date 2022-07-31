import { db, sessions_class } from '$lib/database';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import { beforeStart } from '$lib/events';

await beforeStart();

export const getSession: GetSession = async ({ locals }) => {
	const sessionId = locals.cookies.session_id;
	const id = sessions_class.get(sessionId);
	const user = id ? await db.user.findUnique({ where: { id } }) : null;
	return {
		user,
	};
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.cookies = parse(event.request.headers.get('cookie') || '');

	const response = await resolve(event);

	return response;
};
