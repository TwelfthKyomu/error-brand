import styles from "./LoadingState.module.scss";

export const LoadingState = ({ label = "Загружаем…" }: { label?: string }) => (
	<p className={styles.loading} role="status">
		<span className={styles.bar} aria-hidden="true" />
		{label}
	</p>
);
