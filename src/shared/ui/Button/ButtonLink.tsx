import clsx from "clsx";
import Link from "next/link";

import styles from "./Button.module.scss";
import type { ButtonLinkProps } from "./Button.type";

export const ButtonLink = ({
	variant = "primary",
	size = "medium",
	className,
	...props
}: ButtonLinkProps) => (
	<Link
		className={clsx(
			styles.button,
			styles[variant],
			styles[size],
			className
		)}
		{...props}
	/>
);
