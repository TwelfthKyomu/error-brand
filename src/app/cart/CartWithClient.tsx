import { CartContent } from "./CartContent";

import { getCurrentClient } from "@/shared/lib/auth/session";

export const CartWithClient = async () => {
	const client = await getCurrentClient();

	return <CartContent client={client ?? undefined} />;
};
