import { redirect } from "next/navigation";

import { getCurrentClient } from "@/shared/lib/auth/session";

export async function RedirectIfSignedIn() {
	if (await getCurrentClient()) redirect("/account");

	return null;
}
