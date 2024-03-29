const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;

export const getOAuthURL = (state: string) => {
	const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
	url.searchParams.append('client_id', client_id);
	url.searchParams.append('redirect_uri', 'https://localhost:3000/api/oauth/code?provider=google');
	url.searchParams.append('response_type', 'code');
	url.searchParams.append('scope', 'openid email');
	url.searchParams.append('state', state);
	return url;
};

export const handleOAuthCode = async (code: string): Promise<string | undefined> => {
	const tokenURL = new URL('https://oauth2.googleapis.com/token');
	tokenURL.searchParams.append('code', code);
	tokenURL.searchParams.append(
		'redirect_uri',
		encodeURI('https://localhost:3000/api/oauth/code?provider=google'),
	);
	tokenURL.searchParams.append('client_id', client_id);
	tokenURL.searchParams.append('client_secret', client_secret);
	tokenURL.searchParams.append('grant_type', 'authorization_code');

	const token_response = await fetch(tokenURL, { method: 'post' }).then((r) => r.json());
	const token = token_response.access_token;
	if (!token) return;

	console.log(token);

	return JSON.parse(
		Buffer.from((token_response.id_token as string).split('.')[1], 'base64').toString(),
	).email;
};
