const client_id = '266186020689-9dt4vgv7nasollcmg96mp66idnes48is.apps.googleusercontent.com';
const client_secret = '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';

export default async (code: string): Promise<string | undefined> => {
	const tokenURL = new URL('https://oauth2.googleapis.com/token');
	tokenURL.searchParams.append('code', code);
	tokenURL.searchParams.append('redirect_uri', encodeURI('https://localhost:3000/login?provider=google'));
	tokenURL.searchParams.append('client_id', client_id);
	tokenURL.searchParams.append('client_secret', client_secret);
	tokenURL.searchParams.append('grant_type', 'authorization_code');

	const token_response = await fetch(tokenURL, { method: 'post' }).then((r) => r.json());
	const token = token_response.access_token;
	if (!token) return;

	console.log(token);

	return JSON.parse(
		Buffer.from((token_response.id_token as string).split('.')[1], 'base64').toString()
	).email;
}