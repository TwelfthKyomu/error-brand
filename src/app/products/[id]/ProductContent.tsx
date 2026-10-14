import { notFound } from "next/navigation";

import type { ProductPageProps } from "./Product.type";
import ProductDetail from "./sections/ProductDetail";
import Related from "./sections/Related";

import { loadCatalog, loadProduct } from "@/shared/lib/admin-api";
import { categoryName } from "@/shared/lib/product";

const RELATED_LIMIT = 4;

export const ProductContent = async ({ params }: ProductPageProps) => {
	const { id: slug } = await params;
	const response = await loadProduct(slug);

	if (!response) notFound();

	const { product, categories } = response;
	const category = categories.find(item => item.id === product.categoryId);
	const related = await loadCatalog(
		category
			? { categorySlug: category.slug, limit: RELATED_LIMIT + 1 }
			: { featured: true, limit: RELATED_LIMIT + 1 }
	);

	return (
		<>
			<ProductDetail
				product={product}
				categoryName={categoryName(categories, product)}
			/>
			<Related
				products={(related?.products ?? [])
					.filter(item => item.id !== product.id)
					.slice(0, RELATED_LIMIT)}
				categories={categories}
			/>
		</>
	);
};
