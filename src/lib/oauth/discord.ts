export async function auth(code: string) {
	console.log('Discord auth initialised');
	let tokenReq = await getToken(code);
	if (tokenReq.ok) {
		const tokenData = await tokenReq.json();
		console.log(tokenData);

		let userReq = await getUser(tokenData.access_token);
		if (userReq.ok) {
			return (await userReq.json()).id;
		}
		console.log('Bad request');
		return;
	}
	console.log('Bad token');
	return;
}
async function getToken(code: string) {
	var body = new URLSearchParams();
	body.append('client_id', '987076912247627826');
	body.append('client_secret', 'wi15ZeH5tnQSRvK8HZSvmpKCvRsvld5s');
	body.append('grant_type', 'authorization_code');
	body.append('code', code);
	body.append('redirect_uri', 'https://localhost:3000/login?provider=discord');

	return await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	});
}

async function getUser(access_token: string) {
	return await fetch('https://discordapp.com/api/users/@me', {
		method: 'GET',
		headers: { Authorization: `Bearer ${access_token}` }
	});
}

const client_id = '987076912247627826';
const client_secret = 'wi15ZeH5tnQSRvK8HZSvmpKCvRsvld5s';

export default async (code: string): Promise<string | undefined> => {
	const body = new URLSearchParams();
	body.append('code', code);
	body.append('redirect_uri', 'https://localhost:3000/login?provider=discord');
	body.append('client_id', client_id);
	body.append('client_secret', client_secret);
	body.append('grant_type', 'authorization_code');

	const token_response = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	}).then((r) => r.json());
	const token = token_response.access_token;
	if (!token) return;

	const data_response = await fetch('https://discordapp.com/api/users/@me', {
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` }
	}).then((r) => r.json());
	return data_response.id;
};
