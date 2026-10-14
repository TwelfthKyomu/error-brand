import Wall from "./sections/Wall";

import { loadCatalog } from "@/shared/lib/admin-api";

const WALL_LIMIT = 60;

export default async function MainPage() {
	const catalog = await loadCatalog({
		limit: WALL_LIMIT,
		sort: "featured",
	});

	return (
		<Wall
			products={catalog?.products ?? []}
			categories={catalog?.categories ?? []}
			hasSecret={Boolean(process.env.WALL_SECRET_SLUG)}
		/>
	);
}
