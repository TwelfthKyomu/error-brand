import { redirect } from "next/navigation";

import styles from "./Account.module.scss";
import Orders from "./sections/Orders";
import Profile from "./sections/Profile";

import { getCurrentAccount } from "@/shared/lib/auth/session";
import { PageHeader } from "@/shared/ui";

export const AccountContent = async () => {
	const account = await getCurrentAccount();

	if (!account) redirect("/auth/login");

	return (
		<div className={styles.page}>
			<PageHeader
				title={`Привет, ${account.client.firstName}`}
				aside={account.client.email}
			/>
			<div className={styles.grid}>
				<Orders orders={account.orders} />
				<Profile client={account.client} />
			</div>
		</div>
	);
};
