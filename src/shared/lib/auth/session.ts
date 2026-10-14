import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

import {
	loadClientAccount,
	type Client,
	type MeResponse,
} from "@/shared/lib/admin-api";

const SESSION_COOKIE = "error_brand_session";

export async function setSessionCookie(
	token: string,
	expiresAt: Date
): Promise<void> {
	const store = await cookies();
	store.set(SESSION_COOKIE, token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		expires: expiresAt,
	});
}

export async function clearSessionCookie(): Promise<void> {
	const store = await cookies();
	store.delete(SESSION_COOKIE);
}

export const getCurrentAccount = cache(async (): Promise<MeResponse | null> => {
	const store = await cookies();
	const token = store.get(SESSION_COOKIE)?.value;

	return token ? loadClientAccount(token).catch(() => null) : null;
});

export async function getCurrentClient(): Promise<Client | null> {
	return (await getCurrentAccount())?.client ?? null;
}
