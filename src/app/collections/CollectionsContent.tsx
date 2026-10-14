import styles from "./Collections.module.scss";
import {
	type CatalogSearchParams,
	parseCatalogQuery,
} from "./lib/catalogQuery";
import Filters from "./sections/Filters";
import Pagination from "./sections/Pagination";

import { loadCatalog } from "@/shared/lib/admin-api";
import { THING_WORDS, plural } from "@/shared/lib/format";
import { categoryName } from "@/shared/lib/product";
import { EmptyState, PageHeader, ProductCard } from "@/shared/ui";

const PAGE_SIZE = 24;

type CollectionsContentProps = {
	searchParams: CatalogSearchParams;
};

export const CollectionsContent = async ({
	searchParams,
}: CollectionsContentProps) => {
	const query = parseCatalogQuery(await searchParams);

	const catalog = await loadCatalog({
		page: query.page ?? 1,
		limit: PAGE_SIZE,
		categorySlug: query.category,
		search: query.q,
		sort: query.sort,
		inStock: query.inStock,
		featured: query.featured,
	});

	const category = catalog?.categories.find(
		item => item.slug === query.category
	);

	return (
		<>
			<PageHeader
				title={category?.name ?? "Все вещи"}
				aside={
					catalog &&
					`${catalog.total} ${plural(catalog.total, THING_WORDS)}`
				}
			/>

			<Filters query={query} categories={catalog?.categories ?? []} />

			{!catalog ? (
				<EmptyState
					title="Не удалось загрузить каталог"
					description="Попробуйте обновить страницу"
				/>
			) : catalog.products.length === 0 ? (
				<EmptyState
					title="Ничего не нашлось"
					description="Сбросьте фильтры или поищите по-другому"
				/>
			) : (
				<div className={styles.grid}>
					{catalog.products.map(product => (
						<ProductCard
							key={product.id}
							product={product}
							categoryName={categoryName(
								catalog.categories,
								product
							)}
						/>
					))}
				</div>
			)}

			<Pagination
				query={query}
				pages={catalog ? Math.ceil(catalog.total / PAGE_SIZE) : 0}
			/>
		</>
	);
};
