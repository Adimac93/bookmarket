import type { RequestHandler } from '@sveltejs/kit';
import { App } from '@octokit/app';
import { sessions_class } from '$lib/database';

const app = new App({
	appId: process.env.GITHUB_APP_ID,
	privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	clientId: process.env.GITHUB_CLIENT_ID,
});
const installationId = parseInt(process.env.GITHUB_INSTALLATION_ID);

export const post: RequestHandler = async ({ request, locals }) => {
	const data = await request.json();

	if (!data.title || !data.description || !data.category || !data.isBug) {
		return { status: 400, body: 'Missing feedback fields' };
	}

	if (data.title.length > 60 || data.description.length > 65536) {
		return { status: 403, body: 'Exceded data limit' };
	}
	if (data.category != ('ui' || 'account' || 'oauth')) {
		return { status: 403, body: `Unknown category ${data.category}` };
	}
	const userId = sessions_class.get(locals.cookies.session_id);
	if (!userId) {
		return { status: 401, body: 'Missing cookie "session_id"' };
	}

	if (process.env.NODE_ENV === 'development') {
		console.log('Feedback sent', {
			title: data.title,
			body: `${data.description} userId: \`${userId}\``,
			labels: ['feedback', data.isBug ? 'bug' : 'feature'],
		});
	} else {
		const octokit = await app.getInstallationOctokit(installationId);
		const res = await octokit.request('POST /repos/Adimac93/bookmarket/issues', {
			title: data.title,
			body: `${data.description}\nuserId: \`${userId}\``,
			labels: ['feedback', data.isBug ? 'bug' : 'feature'],
		});
	}

	return { status: 200 };
};
