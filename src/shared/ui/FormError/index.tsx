import styles from "./FormError.module.scss";

export const FormError = ({ message }: { message?: string }) => {
	if (!message) return null;

	return (
		<p className={styles.error} role="alert">
			{message}
		</p>
	);
};
