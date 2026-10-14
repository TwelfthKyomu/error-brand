const STORAGE_KEY = "error-wall-secret";

export function readFoundSecret(): string | undefined {
	try {
		return window.localStorage.getItem(STORAGE_KEY) ?? undefined;
	} catch {
		return undefined;
	}
}

export function rememberFoundSecret(slug: string): void {
	try {
		window.localStorage.setItem(STORAGE_KEY, slug);
	} catch {
		return;
	}
}
