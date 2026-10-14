import type { Product } from "@/shared/lib/admin-api";
import type { NewCartItem } from "@/shared/lib/cart";

export type SheetProps = {
	product: Product;
	categoryName?: string;
	related: Product[];
	from?: DOMRect;
	onTaken: (item: NewCartItem) => void;
	onSwitch: (product: Product) => void;
	onClose: () => void;
};

export type SheetVisualProps = {
	product: Product;
	categoryName?: string;
};

export type SheetRelatedProps = {
	products: Product[];
	categoryName?: string;
	onSwitch: (product: Product) => void;
};
