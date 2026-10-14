import { LogoutButton } from "./LogoutButton";
import styles from "./Profile.module.scss";
import type { ProfileProps } from "./Profile.type";

import { clientName } from "@/shared/lib/product";

const Profile = ({ client }: ProfileProps) => (
	<section className={styles.profile} aria-labelledby="profile-title">
		<h2 id="profile-title" className={styles.title}>
			Профиль
		</h2>
		<dl className={styles.fields}>
			<div className={styles.field}>
				<dt>Имя</dt>
				<dd>{clientName(client)}</dd>
			</div>
			<div className={styles.field}>
				<dt>Email</dt>
				<dd>{client.email}</dd>
			</div>
			{client.phone && (
				<div className={styles.field}>
					<dt>Телефон</dt>
					<dd>{client.phone}</dd>
				</div>
			)}
		</dl>
		<LogoutButton />
	</section>
);

export default Profile;
