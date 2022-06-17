import { db } from '$lib/database';
export async function auth(code: string) {
	console.log('Discord auth initialised');
	let tokenReq = await getToken(code);
	console.log(tokenReq);
	if (tokenReq.ok) {
		let userReq = await getUser(tokenReq.data.access_token);
		console.log(userReq);
		if (userReq.ok) {
			const userData = userReq.data;
			console.log(userData.id, userData.email, userData.username);

			let user = await db.user.findFirst({ where: { discord_id: userData.id } });
			if (user) {
				console.log('Account already created');
			} else {
				console.log('Creating account');
				await db.user.create({
					data: { name: userData.username, discord_id: userData.id }
				});
			}
		} else {
			console.log('Bad request');
		}
	} else {
		console.log('Bad token');
	}
}

async function getToken(code: string): Promise<fetchResult> {
	var body = new URLSearchParams();
	body.append('client_id', '987076912247627826');
	body.append('client_secret', 'wi15ZeH5tnQSRvK8HZSvmpKCvRsvld5s');
	body.append('grant_type', 'authorization_code');
	body.append('code', code);
	body.append('redirect_uri', 'https://localhost:3000/login?provider=discord');

	return await $fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	});
}

async function getUser(access_token: string): Promise<fetchResult> {
	return await $fetch('https://discordapp.com/api/users/@me', {
		method: 'GET',
		headers: { Authorization: `Bearer ${access_token}` }
	});
}

async function $fetch(url: string, payload: RequestInit): Promise<fetchResult> {
	return await fetch(url, payload)
		.then(async function (response) {
			return {
				data: await response.json(),
				ok: response.ok,
				status: response.statusText
			};
		})
		.catch((e) => {
			return {
				data: e,
				ok: false,
				status: 'Fetch failed'
			};
		});
}
interface fetchResult {
	data: any;
	ok: boolean;
	status: string;
}
