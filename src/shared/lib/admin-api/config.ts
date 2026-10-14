const url = process.env.ADMIN_API_URL?.replace(/\/+$/, "");
const apiKey = process.env.ADMIN_API_KEY;

export function getAdminApiConfig(): { url: string; apiKey: string } {
	if (!url) throw new Error("ADMIN_API_URL is not set");
	if (!apiKey) throw new Error("ADMIN_API_KEY is not set");

	return { url, apiKey };
}
