import { Suspense } from "react";

import { AccountContent } from "./AccountContent";

import { LoadingState } from "@/shared/ui";

export const metadata = {
	title: "Кабинет",
};

export default function AccountPage() {
	return (
		<Suspense fallback={<LoadingState label="Открываем кабинет…" />}>
			<AccountContent />
		</Suspense>
	);
}
