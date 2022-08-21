import { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } from '$env/static/private';

export const getOAuthURL = (state: string) => {
	const url = new URL('https://www.facebook.com/v14.0/dialog/oauth');
	url.searchParams.append('client_id', FACEBOOK_CLIENT_ID);
	url.searchParams.append(
		'redirect_uri',
		'https://localhost:3000/api/oauth/code?provider=facebook',
	);
	url.searchParams.append('response_type', 'code');
	url.searchParams.append('state', state);
	return url;
};

export const handleOAuthCode = async (code: string): Promise<string | undefined> => {
	const tokenURL = new URL('https://graph.facebook.com/v14.0/oauth/access_token');
	tokenURL.searchParams.append('code', code);
	tokenURL.searchParams.append(
		'redirect_uri',
		'https://localhost:3000/api/oauth/code?provider=facebook',
	);
	tokenURL.searchParams.append('client_id', FACEBOOK_CLIENT_ID);
	tokenURL.searchParams.append('client_secret', FACEBOOK_CLIENT_SECRET);

	const token_response = await fetch(tokenURL).then((r) => r.json());
	const token = token_response.access_token;
	if (!token) return;

	const dataURL = new URL('https://graph.facebook.com/debug_token');
	dataURL.searchParams.append('input_token', token);
	dataURL.searchParams.append('access_token', `${FACEBOOK_CLIENT_ID}|${FACEBOOK_CLIENT_SECRET}`);

	const data_response = await fetch(dataURL).then((r) => r.json());
	return data_response.data?.user_id;
};
