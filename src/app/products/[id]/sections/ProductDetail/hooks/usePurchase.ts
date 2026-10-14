"use client";

import { useState } from "react";

import { useProductChoice } from "@/shared/hooks/useProductChoice";
import type { Product } from "@/shared/lib/admin-api";
import { takeState } from "@/shared/lib/product";

export function usePurchase(product: Product) {
	const choice = useProductChoice(product);
	const [quantity, setQuantity] = useState(1);
	const [taken, setTaken] = useState(false);

	const select = (name: string, value: string) => {
		choice.select(name, value);
		setQuantity(1);
		setTaken(false);
	};

	const take = () => {
		choice.take(quantity);
		setQuantity(1);
		setTaken(true);
	};

	return {
		selection: choice.selection,
		price: choice.price,
		inCart: choice.inCart,
		left: choice.left,
		quantity: Math.max(1, Math.min(quantity, choice.left)),
		state: takeState(product, choice.variant, choice.left, taken),
		select,
		setQuantity,
		take,
	};
}
