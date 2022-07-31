interface SessionManager {
	/** @returns sessionID */
	logIn(userID: string, maxAge: number): string;

	getUserID(sessionID: string): string | undefined;

	getAllDevices(userID: string): string[] | undefined;

	logOut(sessionID: string): void;

	logOutAllDevices(userID: string): void;
}

interface Session {
	userID: string;
	expires: number;
}

const hashMap: Record<string, Session> = Object.create(null);

export const session: SessionManager = {
	logIn(userID, maxAge) {
		const sessionID = crypto.randomUUID();

		hashMap[sessionID] = {
			userID,
			expires: Date.now() + maxAge * 1000,
		};
		return sessionID;
	},
	getUserID(sessionID) {
		const user = hashMap[sessionID];
		if (!user) {
			return;
		}
		if (user.expires < Date.now()) {
			delete hashMap[sessionID];
			return;
		}
		return user.userID;
	},
	getAllDevices(userID) {
		const now = Date.now();
		let result: string[] = [];

		for (const sessionID in hashMap) {
			if (hashMap[sessionID].expires > now) {
				delete hashMap[sessionID];
			} else if (hashMap[sessionID].userID === userID) {
				result.push(sessionID);
			}
		}
		return result;
	},
	logOut(sessionID) {
		const userID = this.getUserID(sessionID);
		if (!userID) {
			return;
		}
		delete hashMap[sessionID];
	},
	logOutAllDevices(userID) {
		const devices = this.getAllDevices(userID);
		if (!devices) {
			return;
		}
		for (const sessionID of devices) {
			delete hashMap[sessionID];
		}
	},
};

export const sweep = () => {
	const now = Date.now();

	for (const sessionID in hashMap) {
		if (hashMap[sessionID].expires > now) {
			delete hashMap[sessionID];
		}
	}
};
