"use server";

import { redirect } from "next/navigation";

import { clearSessionCookie, setSessionCookie } from "./session";

import {
	AdminApiError,
	loginClient,
	registerClient,
	requestPasswordReset,
	resetPassword,
	verifyClient,
} from "@/shared/lib/admin-api";

export type ActionResult =
	| {
			error?: string;
	  }
	| undefined;

function errorMessage(error: unknown, fallback: string): string {
	return error instanceof AdminApiError ? error.message : fallback;
}

export async function registerAction(input: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}): Promise<ActionResult> {
	try {
		await registerClient({
			...input,
			lastName: input.lastName || undefined,
		});
	} catch (error) {
		return { error: errorMessage(error, "Не удалось зарегистрироваться") };
	}

	return {};
}

export async function verifyAction(input: {
	email: string;
	code: string;
}): Promise<ActionResult> {
	try {
		const result = await verifyClient(input);
		await setSessionCookie(result.token, new Date(result.expiresAt));
	} catch (error) {
		return { error: errorMessage(error, "Не удалось подтвердить почту") };
	}

	redirect("/account");
}

export async function loginAction(input: {
	email: string;
	password: string;
}): Promise<ActionResult> {
	try {
		const result = await loginClient(input);
		await setSessionCookie(result.token, new Date(result.expiresAt));
	} catch (error) {
		return { error: errorMessage(error, "Не удалось войти") };
	}

	redirect("/account");
}

export async function forgotPasswordAction(input: {
	email: string;
}): Promise<ActionResult> {
	try {
		await requestPasswordReset(input);
	} catch (error) {
		return { error: errorMessage(error, "Не удалось отправить код") };
	}

	return {};
}

export async function resetPasswordAction(input: {
	email: string;
	code: string;
	password: string;
}): Promise<ActionResult> {
	try {
		const result = await resetPassword(input);

		await setSessionCookie(result.token, new Date(result.expiresAt));
	} catch (error) {
		return { error: errorMessage(error, "Не удалось сменить пароль") };
	}

	redirect("/account");
}

export async function logoutAction(): Promise<void> {
	await clearSessionCookie();
	redirect("/");
}
