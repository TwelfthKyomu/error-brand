import type { CSSProperties } from "react";

import type { Slot } from "../Wall.type";

import type { Product } from "@/shared/lib/admin-api";
import {
	POSTER_LETTER,
	POSTER_PADDING,
	longestWord,
} from "@/shared/lib/poster";

const WIDE_BRAND = 240;
const LARGE_NAME = 64;
const REGULAR_NAME = 52;

export function cssVars(
	values: Record<string, string | number | undefined>
): CSSProperties {
	return values as CSSProperties;
}

export function posterStyle(
	slot: Slot,
	order: number,
	extra: Record<string, string | number> = {}
): CSSProperties {
	return cssVars({
		"--x": `${slot.x}px`,
		"--y": `${slot.y}px`,
		"--w": slot.w > 0 ? `${slot.w}px` : undefined,
		"--h": slot.h === undefined ? undefined : `${slot.h}px`,
		"--r": `${slot.r ?? 0}deg`,
		"--sheen-a": `${100 + ((order * 37) % 50)}deg`,
		...extra,
	});
}

export function flyerFontSize(name: string, slot: Slot): number {
	const base = slot.size === "large" ? LARGE_NAME : REGULAR_NAME;

	return Math.min(
		base,
		Math.floor(
			(slot.w - POSTER_PADDING) / (longestWord(name) * POSTER_LETTER)
		)
	);
}

export function flyerPaper(
	product: Product,
	order: number,
	secret?: boolean
): string {
	if (secret) return "var(--wall-ink)";

	return product.isFeatured || order % 2
		? "var(--wall-paper-white)"
		: "var(--wall-paper)";
}

export function brandWord(width: number): string {
	return width > WIDE_BRAND ? "ERROR" : "ERR OR";
}

export function brandFontSize(width: number): number {
	return Math.floor(
		(width - POSTER_PADDING) / (width > WIDE_BRAND ? 4.7 : 2.8)
	);
}
