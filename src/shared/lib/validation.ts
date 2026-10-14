export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 128;

export function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}
