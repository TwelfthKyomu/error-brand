"use client";

import { useTransition } from "react";

import { logoutAction } from "@/shared/lib/auth/actions";
import { Button } from "@/shared/ui";

export const LogoutButton = () => {
	const [pending, startTransition] = useTransition();

	return (
		<Button
			variant="outline"
			disabled={pending}
			onClick={() => startTransition(() => logoutAction())}
		>
			{pending ? "Выходим…" : "Выйти"}
		</Button>
	);
};
