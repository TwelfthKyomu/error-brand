import clsx from "clsx";

import styles from "./SoldRibbon.module.scss";

export const SoldRibbon = ({ className }: { className?: string }) => (
	<span className={clsx(styles.ribbon, className)} aria-hidden="true">
		Разобрали
	</span>
);
