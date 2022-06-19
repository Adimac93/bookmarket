import type { RequestHandler } from '@sveltejs/kit';
import { Provider, registerSession } from '$lib/oauth/common';
import { sessions, signups, db } from '$lib/database';
import { parse } from 'cookie';
export const post: RequestHandler = async ({ request, url }) => {
	const form = await request.json();
	if (!form) return { status: 401 };
	const signupData = signups[url.searchParams.get('id') || ''];
	if (!signupData) return { status: 401 };

	let user = await registerNewUser(form.name, signupData.id, signupData.provider);
	if (!user) {
		return { status: 403 };
	}

	return { status: 200 };
};
async function registerNewUser(name: string, id: string, provider: Provider) {
	if (provider == Provider.Discord) {
		return await db.user.create({
			data: { name, discord_id: id }
		});
	} else if (provider == Provider.Google) {
		return await db.user.create({
			data: { name, google_id: id }
		});
	} else if (provider == Provider.Facebook) {
		return await db.user.create({
			data: { name, facebook_id: id }
		});
	}
}
