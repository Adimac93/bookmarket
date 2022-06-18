import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '$lib/oauth/discord';
import { Provider, registerSession } from '$lib/oauth/common';
import { sessions, signups, db } from '$lib/database';
import { parse } from 'cookie';
export const post: RequestHandler = async ({ request, url }) => {
	const form = await request.json();
	if (!form) return { status: 401 };
	const signupData = signups[url.searchParams.get('id') || ''];
	if (!signupData) return { status: 401 };
	if (signupData.provider == Provider.Discord) {
		let user;
		try {
			user = await db.user.create({
				data: { name: form.name, discord_id: signupData.id }
			});
		} catch (error) {
			return { status: 403 };
		}

		console.log(`User ${form.name} has been created`);

		return registerSession(user.id);
	} else if (signupData.provider == Provider.Google) {
		//TODO
	} else if (signupData.provider == Provider.Facebook) {
		//TODO
	}

	return { status: 200 };
};
