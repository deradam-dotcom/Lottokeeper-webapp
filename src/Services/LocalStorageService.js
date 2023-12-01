class LocalStorageService {
	saveUserState(role, state) {
		// Save user state to local storage with the key as the user role
		const key = `${role.toLowerCase()}`;
		const stringValue = JSON.stringify(state);
		window.localStorage.setItem(key, stringValue);
	}

	getUserState(role) {
		// Get user state from local storage based on the user role
		const key = `${role.toLowerCase()}`;
		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	}

	deleteUserState(role) {
		// Delete user state from local storage based on the user role
		const key = `${role.toLowerCase()}`;
		window.localStorage.removeItem(key);
	}

	deleteAll() {
		// Delete all data from local storage
		window.localStorage.clear();
	}
}

const localStorageService = new LocalStorageService();
export default localStorageService;
