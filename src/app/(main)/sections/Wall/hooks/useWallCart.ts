"use client";

import { useState } from "react";

import { takenText } from "../lib/messages";
import { productTabs, stockLeft } from "../lib/tabs";
import type { Tab } from "../Wall.type";

import { useCart } from "@/shared/hooks/useCart";
import type { Product } from "@/shared/lib/admin-api";
import type { NewCartItem } from "@/shared/lib/cart";
import { cartLine, countInCart } from "@/shared/lib/cart";

const REFILL_MS = 900;

export function useWallCart(showToast: (text: string) => void) {
	const { items, addItem } = useCart();
	const [torn, setTorn] = useState<Record<string, number[]>>({});

	const announce = (item: NewCartItem) => showToast(takenText(item));

	const tabsFor = (product: Product, count: number) =>
		productTabs(product, count, items, torn[product.slug] ?? []);

	const refill = (slug: string) =>
		setTorn(previous => ({ ...previous, [slug]: [] }));

	const tear = (product: Product, tab: Tab, count: number) => {
		const item = cartLine(product, tab.variant);

		addItem(item);
		announce(item);

		if (tab.variant) return;

		const next = [...(torn[product.slug] ?? []), tab.index];
		const left = stockLeft(product, countInCart(items, product.id) + 1);

		setTorn(previous => ({ ...previous, [product.slug]: next }));

		if (next.length >= count && left > 0) {
			window.setTimeout(() => refill(product.slug), REFILL_MS);
		}
	};

	return { tabsFor, tear, announce };
}
