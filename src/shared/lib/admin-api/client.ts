import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { getAdminApiConfig } from "./config";
import type {
	AuthResult,
	Catalog,
	CatalogOptions,
	CouponPreview,
	Look,
	MeResponse,
	Order,
	OrderInput,
	ProductResponse,
	RegisterResult,
} from "./types";

import { getApiErrorMessage } from "@/shared/lib/http";

const CLIENT_SESSION_HEADER = "x-client-session";
export const CATALOG_TAG = "catalog";

export class AdminApiError extends Error {
	constructor(
		message: string,
		public readonly status: number
	) {
		super(message);
		this.name = "AdminApiError";
	}
}

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
	const { url, apiKey } = getAdminApiConfig();

	const response = await fetch(`${url}/api/storefront/v1${path}`, {
		...init,
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${apiKey}`,
			...init?.headers,
		},
	});

	if (!response.ok) {
		const message = await getApiErrorMessage(
			response,
			`Admin API ${response.status} on ${path}`
		);
		throw new AdminApiError(message, response.status);
	}

	return (await response.json()) as T;
}

function post<T>(path: string, body: unknown): Promise<T> {
	return adminFetch<T>(path, {
		method: "POST",
		body: JSON.stringify(body),
		cache: "no-store",
	});
}

export async function loadCatalog(
	options: CatalogOptions = {}
): Promise<Catalog | undefined> {
	"use cache";
	cacheTag(CATALOG_TAG);

	const params = new URLSearchParams({ type: "physical" });

	for (const [key, value] of Object.entries(options)) {
		if (value !== undefined) params.set(key, String(value));
	}

	try {
		const catalog = await adminFetch<Catalog>(`/products?${params}`);

		cacheLife("hours");

		return catalog;
	} catch {
		cacheLife("minutes");

		return undefined;
	}
}

export async function loadProduct(
	slug: string
): Promise<ProductResponse | null> {
	"use cache";
	cacheTag(CATALOG_TAG);
	cacheLife("hours");

	try {
		const response = await adminFetch<ProductResponse>(
			`/products/${encodeURIComponent(slug)}`
		);
		return response.product.type === "physical" ? response : null;
	} catch (error) {
		if (error instanceof AdminApiError && error.status === 404) return null;
		throw error;
	}
}

export async function loadLooks(): Promise<Look[]> {
	"use cache";
	cacheTag(CATALOG_TAG);

	try {
		const { looks } = await adminFetch<{ looks: Look[] }>("/looks");

		cacheLife("hours");

		return looks;
	} catch {
		cacheLife("minutes");

		return [];
	}
}

export function createOrder(input: OrderInput): Promise<Order> {
	return post<Order>("/orders", input);
}

export function previewCoupon(input: {
	code: string;
	items: OrderInput["items"];
}): Promise<CouponPreview> {
	return post<CouponPreview>("/coupons/preview", input);
}

export async function loadOrder(orderId: string): Promise<Order | null> {
	try {
		return await adminFetch<Order>(
			`/orders/${encodeURIComponent(orderId)}`,
			{
				cache: "no-store",
			}
		);
	} catch (error) {
		if (error instanceof AdminApiError && error.status === 404) return null;
		throw error;
	}
}

export function registerClient(input: {
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
}): Promise<RegisterResult> {
	return post<RegisterResult>("/clients/register", input);
}

export function verifyClient(input: {
	email: string;
	code: string;
}): Promise<AuthResult> {
	return post<AuthResult>("/clients/verify", input);
}

export function loginClient(input: {
	email: string;
	password: string;
}): Promise<AuthResult> {
	return post<AuthResult>("/clients/login", input);
}

export function requestPasswordReset(input: {
	email: string;
}): Promise<RegisterResult> {
	return post<RegisterResult>("/clients/password/forgot", input);
}

export function resetPassword(input: {
	email: string;
	code: string;
	password: string;
}): Promise<AuthResult> {
	return post<AuthResult>("/clients/password/reset", input);
}

export async function loadClientAccount(
	token: string
): Promise<MeResponse | null> {
	try {
		return await adminFetch<MeResponse>("/clients/me", {
			headers: { [CLIENT_SESSION_HEADER]: token },
			cache: "no-store",
		});
	} catch (error) {
		if (error instanceof AdminApiError && error.status === 401) return null;
		throw error;
	}
}
