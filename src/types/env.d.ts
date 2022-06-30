export {};
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;

			DISCORD_CLIENT_ID: string;
			DISCORD_CLIENT_SECRET: string;

			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;

			FACEBOOK_CLIENT_ID: string;
			FACEBOOK_CLIENT_SECRET: string;

			BOOKS_API_KEY: string;

			GITHUB_APP_ID: string;
			GITHUB_CLIENT_ID: string;
			GITHUB_CLIENT_SECRET: string;
			GITHUB_APP_PRIVATE_KEY: string;
			GITHUB_INSTALLATION_ID: string;

			IMGUR_CLIENT_ID: string;
		}
	}
}
