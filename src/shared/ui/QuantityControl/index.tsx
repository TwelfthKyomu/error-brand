import clsx from "clsx";

import styles from "./QuantityControl.module.scss";
import type { QuantityControlProps } from "./QuantityControl.type";

export const QuantityControl = ({
	value,
	onChange,
	min = 1,
	max = 99,
	className,
}: QuantityControlProps) => (
	<div className={clsx(styles.control, className)}>
		<button
			type="button"
			className={styles.button}
			onClick={() => onChange(value - 1)}
			disabled={value <= min}
			aria-label="Уменьшить количество"
		>
			−
		</button>
		<span className={styles.value} aria-live="polite">
			{value}
		</span>
		<button
			type="button"
			className={styles.button}
			onClick={() => onChange(value + 1)}
			disabled={value >= max}
			aria-label="Увеличить количество"
		>
			+
		</button>
	</div>
);
