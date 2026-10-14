"use client";

import { useSyncExternalStore } from "react";

import type { NewCartItem } from "@/shared/lib/cart";
import {
	addToCart,
	cartTotal,
	changeQuantity,
	emptyCart,
	readCart,
	subscribeCart,
	writeCart,
} from "@/shared/lib/cart";

export function useCart() {
	const items = useSyncExternalStore(subscribeCart, readCart, emptyCart);
	const loading = useSyncExternalStore(
		subscribeCart,
		() => false,
		() => true
	);

	const updateQuantity = (itemId: string, quantity: number) =>
		writeCart(changeQuantity(items, itemId, quantity));

	const removeItem = (itemId: string) =>
		writeCart(changeQuantity(items, itemId, 0));

	const addItems = (added: NewCartItem[]) =>
		writeCart(addToCart(items, added));

	const addItem = (item: NewCartItem) => addItems([item]);

	const clear = () => writeCart([]);

	return {
		items,
		total: cartTotal(items),
		loading,
		updateQuantity,
		removeItem,
		addItem,
		addItems,
		clear,
	};
}
