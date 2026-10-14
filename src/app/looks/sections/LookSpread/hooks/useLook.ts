"use client";

import { useState } from "react";

import { readyItems } from "../../../lib/look";

import { useCart } from "@/shared/hooks/useCart";
import type { Look } from "@/shared/lib/admin-api";
import { cartLine } from "@/shared/lib/cart";

export function useLook(look: Look) {
	const { addItems } = useCart();
	const [active, setActive] = useState<number>();
	const [taken, setTaken] = useState(false);
	const ready = readyItems(look);

	const takeAll = () => {
		addItems(ready.map(({ product }) => cartLine(product)));
		setTaken(true);
	};

	return {
		active,
		setActive,
		taken,
		takeAll,
		readyCount: ready.length,
		choiceCount: look.items.length - ready.length,
	};
}
