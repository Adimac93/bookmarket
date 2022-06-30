interface Feedback {
	category: 'ui' | 'oauth' | 'account';
	title: string;
	description: string;
	isBug: boolean;
	images: string[];
}
