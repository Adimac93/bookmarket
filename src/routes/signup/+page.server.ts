import type { Action } from '@sveltejs/kit';
import { db } from '$lib/database';

export const POST: Action = async ({ request, url, locals }) => {
	const form = await request.json();
	if (!form) throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
	return { status: 401 };

	let user = await db.user.update({ where: { id: locals.user?.id }, data: { name: form.name } });
	if (!user) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
		return { status: 403 };
	}

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
	return { status: 200 };
};
