const client_id = '331682405650576';
const client_secret = '2b90b7b4894df78d6b3f53e387a03c87';

export default async (code: string): Promise<string | undefined> => {
	const tokenURL = new URL('https://graph.facebook.com/v14.0/oauth/access_token');
	tokenURL.searchParams.append('code', code);
	tokenURL.searchParams.append(
		'redirect_uri',
		encodeURI('https://localhost:3000/login?provider=facebook')
	);
	tokenURL.searchParams.append('client_id', client_id);
	tokenURL.searchParams.append('client_secret', client_secret);

	const token_response = await fetch(tokenURL).then((r) => r.json());
	const token = token_response.access_token;
	if (!token) return;

	const dataURL = new URL('https://graph.facebook.com/debug_token');
	dataURL.searchParams.append('input_token', token);
	dataURL.searchParams.append('access_token', `${client_id}|${client_secret}`);

	const data_response = await fetch(dataURL).then((r) => r.json());
	return data_response.data?.user_id;
};
