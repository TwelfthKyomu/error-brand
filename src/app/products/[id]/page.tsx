import { Suspense } from "react";

import type { ProductPageProps } from "./Product.type";
import { ProductContent } from "./ProductContent";

import { LoadingState } from "@/shared/ui";

export default function ProductPage({ params }: ProductPageProps) {
	return (
		<Suspense fallback={<LoadingState label="Загружаем вещь…" />}>
			<ProductContent params={params} />
		</Suspense>
	);
}
