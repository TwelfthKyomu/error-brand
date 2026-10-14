import clsx from "clsx";

import styles from "./EmptyState.module.scss";
import type { EmptyStateProps } from "./EmptyState.type";

export const EmptyState = ({
	title,
	description,
	action,
	className,
}: EmptyStateProps) => (
	<div className={clsx(styles.note, className)}>
		<h2 className={styles.title}>{title}</h2>
		{description && <p className={styles.description}>{description}</p>}
		{action && <div className={styles.action}>{action}</div>}
	</div>
);
