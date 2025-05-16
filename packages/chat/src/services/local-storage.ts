class LocalStorageService {
  set<VALUE>(key: string, value: VALUE): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }

  get<VALUE>(key: string): VALUE | null {
    try {
      const serializedValue = localStorage.getItem(key);

      return serializedValue ? (JSON.parse(serializedValue) as VALUE) : null;
    } catch (error) {
      console.error(`Error getting from localStorage: ${error}`);
      return null;
    }
  }

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error while deleting from localStorage: ${error}`);
    }
  }

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error while cleaning localStorage: ${error}`);
    }
  }
}

export const localStorageService = new LocalStorageService();
