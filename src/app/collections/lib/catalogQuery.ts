import type { CatalogSort } from "@/shared/lib/admin-api";

export type CatalogQuery = {
	category?: string;
	q?: string;
	sort?: CatalogSort;
	inStock?: boolean;
	featured?: boolean;
	page?: number;
};

export type CatalogSearchParams = Promise<
	Record<string, string | string[] | undefined>
>;

export const CATALOG_SORTS: { value: CatalogSort; label: string }[] = [
	{ value: "featured", label: "Сначала выбор ERROR" },
	{ value: "newest", label: "Новые" },
	{ value: "price_asc", label: "Дешевле" },
	{ value: "price_desc", label: "Дороже" },
];

function first(value: string | string[] | undefined): string | undefined {
	return Array.isArray(value) ? value[0] : value || undefined;
}

export function parseCatalogQuery(
	raw: Record<string, string | string[] | undefined>
): CatalogQuery {
	const sort = first(raw.sort);
	const page = Number.parseInt(first(raw.page) ?? "", 10);

	return {
		category: first(raw.category),
		q: first(raw.q)?.trim() || undefined,
		sort: CATALOG_SORTS.find(option => option.value === sort)?.value,
		inStock: first(raw.inStock) === "true" || undefined,
		featured: first(raw.featured) === "true" || undefined,
		page: page > 1 ? page : undefined,
	};
}

export function catalogHref(
	query: CatalogQuery,
	patch: Partial<CatalogQuery>
): string {
	const next: CatalogQuery = { ...query, page: undefined, ...patch };
	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(next)) {
		if (value !== undefined && value !== false) {
			params.set(key, String(value));
		}
	}

	const search = params.toString();

	return search ? `/collections?${search}` : "/collections";
}
