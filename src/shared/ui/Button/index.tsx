import clsx from "clsx";

import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.type";

export const Button = ({
	variant = "primary",
	size = "medium",
	type = "button",
	className,
	...props
}: ButtonProps) => (
	<button
		type={type}
		className={clsx(
			styles.button,
			styles[variant],
			styles[size],
			className
		)}
		{...props}
	/>
);
