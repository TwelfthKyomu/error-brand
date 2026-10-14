import type { Category, Product } from "@/shared/lib/admin-api";

export type RelatedProps = {
	products: readonly Product[];
	categories: readonly Category[];
};
