class LocalStorageService {
	// Save data to local storage
	save(key, value) {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem(key, stringValue);
	}

	// Get data from local storage
	get(key) {
		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	}

	// Delete data from local storage
	delete(key) {
		window.localStorage.removeItem(key);
	}
}

const localStorageService = new LocalStorageService();
export default localStorageService();
