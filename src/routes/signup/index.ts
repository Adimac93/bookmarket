import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '$lib/oauth/discord';
import { Provider } from '$lib/oauth/common';
import { serialize } from 'cookie';
import { sessions, signups, db } from '$lib/database';
import { parse } from 'cookie';
export const post: RequestHandler = async ({ request, url }) => {
	const form = await request.json();
	if (!form) return { status: 401 };
	const signupData = signups[url.searchParams.get('id') || ''];
	if (!signupData) return { status: 401 };
	if (signupData.provider == Provider.Discord) {
		try {
			await db.user.create({
				data: { name: form.name, discord_id: signupData.id }
			});
		} catch (error) {
			return { status: 403 };
		}

		console.log(`User ${form.name} has been created`);
		return { status: 303 };
	} else if (signupData.provider == Provider.Google) {
		//TODO
	} else if (signupData.provider == Provider.Facebook) {
		//TODO
	}

	return { status: 200 };
};
