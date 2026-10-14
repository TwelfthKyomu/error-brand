import type { Product } from "@/shared/lib/admin-api";

export type ProductChipsProps = {
	product: Product;
	categoryName?: string;
	className?: string;
};
