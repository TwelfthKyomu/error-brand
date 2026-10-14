import type { Look } from "@/shared/lib/admin-api";
import { isSoldOut } from "@/shared/lib/product";

export function pointLabel(index: number): string {
	return String(index + 1).padStart(2, "0");
}

export function readyItems(look: Look): Look["items"] {
	return look.items.filter(
		({ product }) => product.variants.length === 0 && !isSoldOut(product)
	);
}

export function lookTotal(look: Look): number {
	return look.items.reduce((sum, { product }) => sum + product.price, 0);
}
