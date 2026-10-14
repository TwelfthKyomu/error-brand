import styles from "./Manifest.module.scss";

import { ButtonLink, StackedName } from "@/shared/ui";

const Manifest = () => (
	<section className={styles.manifest}>
		<h1 className={styles.title}>
			<StackedName name="Одежда на стене" />
		</h1>
		<div className={styles.body}>
			<p className={styles.lead}>
				ERROR — уличная одежда малыми тиражами. Мы не прячем вещи в
				бесконечную ленту: они висят на стене, как объявления в
				переходе. Понравилась — отрываешь купон, и она твоя.
			</p>
			<div className={styles.actions}>
				<ButtonLink href="/" variant="signal" size="large">
					На стену
				</ButtonLink>
				<ButtonLink href="/collections" variant="outline" size="large">
					Списком
				</ButtonLink>
			</div>
		</div>
	</section>
);

export default Manifest;
