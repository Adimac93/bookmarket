import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/database';

export const post: RequestHandler = async ({ request, url, locals }) => {
	const form = await request.json();
	if (!form) return { status: 401 };

	let user = await db.user.update({ where: { id: locals.user?.id }, data: { name: form.name } });
	if (!user) {
		return { status: 403 };
	}

	return { status: 200 };
};
