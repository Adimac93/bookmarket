import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

export const getOAuthURL = (state: string) => {
	const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
	url.searchParams.append('client_id', GOOGLE_CLIENT_ID);
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
	tokenURL.searchParams.append('client_id', GOOGLE_CLIENT_ID);
	tokenURL.searchParams.append('client_secret', GOOGLE_CLIENT_SECRET);
	tokenURL.searchParams.append('grant_type', 'authorization_code');

	const token_response = await fetch(tokenURL, { method: 'post' }).then((r) => r.json());
	const token = token_response.access_token;
	if (!token) return;

	console.log(token);

	return JSON.parse(
		Buffer.from((token_response.id_token as string).split('.')[1], 'base64').toString(),
	).email;
};
