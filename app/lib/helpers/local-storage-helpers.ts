export namespace LocalStorageHelpers {
  export function set<T>(key: string, value: T) {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  export async function get(key: string) {
    if (typeof window === "undefined") return null;

    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
    // return token === "undefined" ? "" : token;
  }

  export async function remove(key: string) {
    localStorage.removeItem(key);
  }

  export async function update<T extends Record<string, any>>(
    key: string,
    value: Partial<T>,
  ) {
    try {
      const existingValue = await get(key);
      if (existingValue) {
        const updatedValue = { ...existingValue, ...value };
        set(key, updatedValue);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
