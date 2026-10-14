import { Suspense } from "react";

import styles from "./Collections.module.scss";
import { CollectionsContent } from "./CollectionsContent";
import type { CatalogSearchParams } from "./lib/catalogQuery";

import { LoadingState } from "@/shared/ui";

export const metadata = {
	title: "Каталог — ERROR",
};

type CollectionsPageProps = {
	searchParams: CatalogSearchParams;
};

export default function CollectionsPage({
	searchParams,
}: CollectionsPageProps) {
	return (
		<div className={styles.page}>
			<Suspense fallback={<LoadingState label="Загружаем каталог…" />}>
				<CollectionsContent searchParams={searchParams} />
			</Suspense>
		</div>
	);
}
