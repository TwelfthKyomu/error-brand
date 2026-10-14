import { Suspense } from "react";

import { CartWithClient } from "./CartWithClient";

import { LoadingState } from "@/shared/ui";

export const metadata = {
	title: "Корзина",
};

export default function CartPage() {
	return (
		<Suspense fallback={<LoadingState label="Открываем корзину…" />}>
			<CartWithClient />
		</Suspense>
	);
}
