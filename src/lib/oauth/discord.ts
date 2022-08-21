import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';

export const getOAuthURL = (state: string) => {
	const url = new URL('https://discord.com/api/oauth2/authorize');
	url.searchParams.append('client_id', DISCORD_CLIENT_ID);
	url.searchParams.append('redirect_uri', 'https://localhost:3000/api/oauth/code?provider=discord');
	url.searchParams.append('response_type', 'code');
	url.searchParams.append('scope', 'identify email');
	url.searchParams.append('state', state);
	return url;
};

export const handleOAuthCode = async (code: string): Promise<string | undefined> => {
	const body = new URLSearchParams();
	body.append('code', code);
	body.append('redirect_uri', 'https://localhost:3000/api/oauth/code?provider=discord');
	body.append('client_id', DISCORD_CLIENT_ID);
	body.append('client_secret', DISCORD_CLIENT_SECRET);
	body.append('grant_type', 'authorization_code');

	const token_response = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
	}).then((r) => r.json());
	const token = token_response.access_token;
	if (!token) return;

	const data_response = await fetch('https://discordapp.com/api/users/@me', {
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	}).then((r) => r.json());
	return data_response.id;
};
