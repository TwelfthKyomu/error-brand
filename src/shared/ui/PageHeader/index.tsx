import styles from "./PageHeader.module.scss";
import type { PageHeaderProps } from "./PageHeader.type";

export const PageHeader = ({ title, aside }: PageHeaderProps) => (
	<header className={styles.header}>
		<h1 className={styles.title}>{title}</h1>
		{aside && <div className={styles.aside}>{aside}</div>}
	</header>
);
