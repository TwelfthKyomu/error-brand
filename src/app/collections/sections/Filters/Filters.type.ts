import type { CatalogQuery } from "../../lib/catalogQuery";

import type { Category } from "@/shared/lib/admin-api";

export type FiltersProps = {
	query: CatalogQuery;
	categories: readonly Category[];
};
