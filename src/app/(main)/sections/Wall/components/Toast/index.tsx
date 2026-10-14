import clsx from "clsx";

import styles from "./Toast.module.scss";

export const Toast = ({ text }: { text?: string }) => (
	<div
		className={clsx(styles.toast, { [styles.visible]: text })}
		role="status"
		aria-live="polite"
	>
		{text}
	</div>
);
