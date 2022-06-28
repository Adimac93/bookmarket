const client_id = process.env.DISCORD_CLIENT_ID;
const client_secret = process.env.DISCORD_CLIENT_SECRET;

export const getOAuthURL = (state: string) => {
	const url = new URL('https://discord.com/api/oauth2/authorize');
	url.searchParams.append('client_id', client_id);
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
	body.append('client_id', client_id);
	body.append('client_secret', client_secret);
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
