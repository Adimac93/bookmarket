import { db } from '$lib/database';
import { session } from '$lib/session';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import { beforeStart } from '$lib/events';

await beforeStart();

export const getSession: GetSession = async ({ locals }) => {
	if (!locals.user) return {};

	const user = await db.user.findUnique({ where: { id: locals.user.id } });
	if (!user) return {};

	return {
		user,
	};
};

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') ?? '');

	if (cookies.session_id) {
		const userID = session.getUserID(cookies.session_id);
		if (userID) {
			event.locals.user = {
				id: userID,
				sessionID: cookies.session_id,
			};
		}
	}

	const response = await resolve(event);

	return response;
};
