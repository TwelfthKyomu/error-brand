import clsx from "clsx";

import styles from "./PickBadge.module.scss";

export const PickBadge = ({ className }: { className?: string }) => (
	<span className={clsx(styles.badge, className)} aria-hidden="true">
		Выбор
		<br />
		ERROR
	</span>
);
