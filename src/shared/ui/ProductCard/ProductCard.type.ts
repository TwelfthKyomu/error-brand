import type { Product } from "@/shared/lib/admin-api";

export type ProductCardProps = {
	product: Product;
	categoryName?: string;
};

export type CardTakeProps = {
	product: Product;
};
