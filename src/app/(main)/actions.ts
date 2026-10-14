"use server";

import { loadProduct } from "@/shared/lib/admin-api";
import type { Product } from "@/shared/lib/admin-api";

export async function revealSecret(): Promise<Product | null> {
	const slug = process.env.WALL_SECRET_SLUG;

	if (!slug) return null;

	const response = await loadProduct(slug).catch(() => null);

	return response?.product ?? null;
}
