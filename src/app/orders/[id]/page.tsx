import { Suspense } from "react";

import type { OrderPageProps } from "./Order.type";
import { OrderContent } from "./OrderContent";

import { LoadingState } from "@/shared/ui";

export const metadata = {
	title: "Заказ",
	robots: { index: false },
};

export default function OrderPage({ params }: OrderPageProps) {
	return (
		<Suspense fallback={<LoadingState label="Загружаем заказ…" />}>
			<OrderContent params={params} />
		</Suspense>
	);
}
