import type { Slot, TileProducts } from "../Wall.type";

import { FLYER_INDEX, LARGE_SLOTS, REGULAR_SLOTS } from "./template";

import type { Product } from "@/shared/lib/admin-api";

const RELATED_LIMIT = 4;

function pickProducts(
	pool: readonly Product[],
	size: number,
	offset: number
): Product[] {
	return Array.from(
		{ length: size },
		(_, index) => pool[(offset * size + index) % pool.length]
	).filter(Boolean);
}

export function tileProducts(
	products: readonly Product[],
	column: number,
	row: number
): TileProducts {
	const featured = products.filter(product => product.isFeatured);
	const others = products.filter(product => !product.isFeatured);
	const offset = Math.abs(column * 5 + row * 3);

	return {
		large: pickProducts(
			featured.length > 0 ? featured : others,
			LARGE_SLOTS,
			offset
		),
		regular: pickProducts(
			others.length > 0 ? others : featured,
			REGULAR_SLOTS,
			offset
		),
	};
}

export function slotProduct(
	assigned: TileProducts,
	slot: Slot,
	order: number
): Product | undefined {
	if (slot.kind !== "flyer") return undefined;

	const pool = slot.size === "large" ? assigned.large : assigned.regular;

	return pool[FLYER_INDEX[order]];
}

export function editionProduct(
	products: readonly Product[]
): Product | undefined {
	const editions = products.filter(
		product => product.editionSize !== undefined
	);

	return editions.find(product => product.isFeatured) ?? editions[0];
}

export function relatedProducts(
	products: readonly Product[],
	product: Product
): Product[] {
	return products
		.filter(
			item =>
				item.id !== product.id && item.categoryId === product.categoryId
		)
		.slice(0, RELATED_LIMIT);
}
