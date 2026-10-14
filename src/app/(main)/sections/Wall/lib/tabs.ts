import type { Tab } from "../Wall.type";

import { shuffledIndexes } from "./random";

import type { Product } from "@/shared/lib/admin-api";
import type { CartItem } from "@/shared/lib/cart";
import { countInCart } from "@/shared/lib/cart";
import { formatMoney } from "@/shared/lib/format";
import {
	availableQuantity,
	remainingCount,
	variantLabel,
} from "@/shared/lib/product";

const TAB_WIDTH = 33;
const TABS_PADDING = 15;
const MORE_LABEL = "все";

export function tabCount(width: number): number {
	return Math.floor((width - TABS_PADDING) / TAB_WIDTH);
}

export function stockLeft(product: Product, inCart: number): number {
	const remaining = remainingCount(product);

	return remaining === undefined
		? Number.POSITIVE_INFINITY
		: remaining - inCart;
}

function intactTabs(
	seed: string,
	count: number,
	left: number,
	torn: readonly number[]
): boolean[] {
	const gone = new Set(torn.filter(index => index < count));
	const limit = Math.max(0, left);
	let intact = count - gone.size;

	for (const index of shuffledIndexes(seed, count)) {
		if (intact <= limit) break;
		if (gone.has(index)) continue;

		gone.add(index);
		intact--;
	}

	return Array.from({ length: count }, (_, index) => !gone.has(index));
}

function variantTabs(
	product: Product,
	count: number,
	items: readonly CartItem[]
): Tab[] {
	const overflow = product.variants.length > count;
	const shown = product.variants.slice(0, overflow ? count - 1 : count);
	const tabs: Tab[] = shown.map((variant, index) => ({
		index,
		intact:
			availableQuantity(product, variant) -
				countInCart(items, product.id, variant.id) >
			0,
		label: variantLabel(variant),
		variant,
	}));

	if (!overflow) return tabs;

	return [
		...tabs,
		{ index: count - 1, intact: true, label: MORE_LABEL, more: true },
	];
}

function couponTabs(
	product: Product,
	count: number,
	items: readonly CartItem[],
	torn: readonly number[]
): Tab[] {
	const left = stockLeft(product, countInCart(items, product.id));

	return intactTabs(product.slug, count, left, torn).map((intact, index) => ({
		index,
		intact,
		label: formatMoney(product.price),
	}));
}

export function productTabs(
	product: Product,
	count: number,
	items: readonly CartItem[],
	torn: readonly number[]
): Tab[] {
	return product.variants.length > 0
		? variantTabs(product, count, items)
		: couponTabs(product, count, items, torn);
}
