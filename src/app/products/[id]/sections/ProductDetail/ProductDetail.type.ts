import type { Product } from "@/shared/lib/admin-api";

export type ProductDetailProps = {
	product: Product;
	categoryName?: string;
};
