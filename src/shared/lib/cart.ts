import type { Product, ProductVariant } from "./admin-api";
import { variantLabel } from "./product";

export type CartItem = {
	id: string;
	productId: string;
	variantId?: string;
	variantLabel?: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
};

export type NewCartItem = Omit<CartItem, "id">;

const STORAGE_KEY = "error-brand-cart";
const EMPTY: CartItem[] = [];
const listeners = new Set<() => void>();

let snapshot: { raw: string | null; items: CartItem[] } = {
	raw: null,
	items: EMPTY,
};

export function readCart(): CartItem[] {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);

		if (raw !== snapshot.raw) {
			snapshot = { raw, items: raw ? JSON.parse(raw) : EMPTY };
		}
	} catch {
		snapshot = { raw: null, items: EMPTY };
	}

	return snapshot.items;
}

export function emptyCart(): CartItem[] {
	return EMPTY;
}

export function writeCart(items: CartItem[]): void {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch {
		return;
	}

	for (const listener of listeners) listener();
}

export function subscribeCart(listener: () => void): () => void {
	listeners.add(listener);
	window.addEventListener("storage", listener);

	return () => {
		listeners.delete(listener);
		window.removeEventListener("storage", listener);
	};
}

function cartItemId(productId: string, variantId?: string): string {
	return `${productId}:${variantId ?? ""}`;
}

export function addToCart(items: CartItem[], added: NewCartItem[]): CartItem[] {
	return added.reduce((next, item) => {
		const id = cartItemId(item.productId, item.variantId);

		return next.some(entry => entry.id === id)
			? next.map(entry =>
					entry.id === id
						? { ...entry, quantity: entry.quantity + item.quantity }
						: entry
				)
			: [...next, { ...item, id }];
	}, items);
}

export function changeQuantity(
	items: CartItem[],
	itemId: string,
	quantity: number
): CartItem[] {
	return quantity <= 0
		? items.filter(item => item.id !== itemId)
		: items.map(item =>
				item.id === itemId ? { ...item, quantity } : item
			);
}

export function cartTotal(items: readonly CartItem[]): number {
	return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function cartQuantity(items: readonly CartItem[]): number {
	return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function countInCart(
	items: readonly CartItem[],
	productId: string,
	variantId?: string
): number {
	return cartQuantity(
		items.filter(
			item =>
				item.productId === productId &&
				(variantId === undefined || item.variantId === variantId)
		)
	);
}

export function cartLine(
	product: Product,
	variant?: ProductVariant,
	quantity = 1
): NewCartItem {
	return {
		productId: product.id,
		variantId: variant?.id,
		variantLabel: variant ? variantLabel(variant) : undefined,
		name: product.name,
		price: variant?.price ?? product.price,
		quantity,
		image: product.images[0] ?? "",
	};
}
