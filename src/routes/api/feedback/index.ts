import type { RequestHandler } from '@sveltejs/kit';
import { App } from '@octokit/app';
import {
	GITHUB_APP_ID,
	GITHUB_APP_PRIVATE_KEY,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GITHUB_INSTALLATION_ID,
	IMGUR_CLIENT_ID,
	NODE_ENV,
} from '$env/static/private';

const app = new App({
	appId: GITHUB_APP_ID,
	privateKey: GITHUB_APP_PRIVATE_KEY,
	clientSecret: GITHUB_CLIENT_SECRET,
	clientId: GITHUB_CLIENT_ID,
});
const installationId = parseInt(GITHUB_INSTALLATION_ID);

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = (await request.json()) as Feedback;

	if (!data.title || !data.description || !data.category || typeof data.isBug !== 'boolean') {
		return { status: 400, body: 'Missing feedback fields' };
	}

	if (data.title.length > 60 || data.description.length > 65536) {
		return { status: 403, body: 'Exceded data limit' };
	}

	if (data.category !== 'ui' && data.category !== 'account' && data.category !== 'oauth') {
		return { status: 403, body: `Unknown category ${data.category}` };
	}

	if (!locals.user) {
		return { status: 401, body: 'Not authenticated' };
	}

	let imageURLs;
	if (data.images) {
		imageURLs = await uploadImages(data.images);
	}

	const issue = {
		title: data.title,
		body: [
			data.description,
			imageURLs ? await githubImages(imageURLs) : '',
			`userId: \`${locals.user.id}\``,
		].join('\n'),
		labels: ['feedback', data.isBug ? 'bug' : 'feature', data.category],
	};

	if (NODE_ENV === 'development') {
		console.log('Feedback sent', issue);
	} else {
		const octokit = await app.getInstallationOctokit(installationId);
		const res = await octokit.request('POST /repos/Adimac93/bookmarket/issues', issue);
		if (res.status == 201) {
			console.log('New issue on https://github.com/Adimac93/bookmarket/issues');
		} else {
			console.log('Something went wrong while sending an issue');
		}
	}

	return { status: 200 };
};

async function uploadImages(images: string[]): Promise<string[]> {
	return await Promise.all(
		images.map(async (image, index) => {
			const formData = new URLSearchParams();
			formData.append('type', 'base64');
			formData.append('image', image);

			const res = await fetch('https://api.imgur.com/3/image', {
				method: 'post',
				headers: { Authorization: `Client-ID ${IMGUR_CLIENT_ID}` },
				body: formData,
			});

			const json = await res.json();
			return json.data.link;
		}),
	);
}

async function githubImages(urls: string[]) {
	const formatedURLs = await Promise.all(
		urls.map((value, index) => {
			return `![Feedback Image ${index + 1}](${value})`;
		}),
	);
	return formatedURLs.join('\n');
}
