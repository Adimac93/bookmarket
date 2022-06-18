import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '$lib/oauth/discord';

export const get: RequestHandler = async ({ url }) => {
	const provider = url.searchParams.get('provider');
	if (provider == 'discord') {
		const code: string = url.searchParams.get('code') || '';
		if (code) {
			await auth(code);
		}
	} else if (provider == 'facebook') {
		const code = url.searchParams.get('code');

		if (code) {
			const token_response = await fetch(`https://graph.facebook.com/v14.0/oauth/access_token?client_id=${331682405650576}&redirect_uri=${encodeURI(`https://localhost:3000/login?provider=facebook`)}&client_secret=${'2b90b7b4894df78d6b3f53e387a03c87'}&code=${code}`).then(r => r.json());
			
			const token = token_response.access_token;
			
			console.log(token);

			const data_response = await fetch(`https://graph.facebook.com/debug_token?input_token=${token}&access_token=331682405650576|2b90b7b4894df78d6b3f53e387a03c87`).then(r => r.json());

			console.log(data_response);

			const id = data_response.user_id;
		}
	} else if (provider == 'google') {
		//TODO
	}

	return { status: 200 };
};
