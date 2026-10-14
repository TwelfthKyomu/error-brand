"use client";

import { useState } from "react";

import { useCart } from "./useCart";

import type { Product } from "@/shared/lib/admin-api";
import { cartLine, countInCart } from "@/shared/lib/cart";
import {
	availableQuantity,
	findVariant,
	initialSelection,
} from "@/shared/lib/product";

export function useProductChoice(product: Product) {
	const { items, addItem } = useCart();
	const [selection, setSelection] = useState(() => initialSelection(product));

	const variant = findVariant(product, selection);
	const inCart = countInCart(items, product.id, variant?.id);
	const left = Math.max(0, availableQuantity(product, variant) - inCart);

	const select = (name: string, value: string) =>
		setSelection({ ...selection, [name]: value });

	const take = (quantity = 1) => {
		const line = cartLine(product, variant, Math.min(quantity, left));

		addItem(line);

		return line;
	};

	return {
		selection,
		variant,
		price: variant?.price ?? product.price,
		inCart,
		left,
		select,
		take,
	};
}
