import type { CartItem } from "@/shared/lib/cart";

export type CartItemsProps = {
	items: CartItem[];
	onUpdateQuantity: (id: string, quantity: number) => void;
	onRemoveItem: (id: string) => void;
};

export type CartLineProps = {
	item: CartItem;
	onUpdateQuantity: (id: string, quantity: number) => void;
	onRemoveItem: (id: string) => void;
};
