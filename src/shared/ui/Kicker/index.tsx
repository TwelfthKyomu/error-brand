import clsx from "clsx";

import styles from "./Kicker.module.scss";
import type { KickerProps } from "./Kicker.type";

export const Kicker = ({ category, featured, className }: KickerProps) => (
	<span className={clsx(styles.kicker, className)}>
		<span className={clsx({ [styles.featured]: featured })}>
			{featured ? "Выбор ERROR" : "ERROR"}
		</span>
		{category && <span className={styles.category}>{category}</span>}
	</span>
);
