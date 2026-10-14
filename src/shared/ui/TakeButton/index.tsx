import clsx from "clsx";

import { TAKE_TEXT } from "./constants";
import styles from "./TakeButton.module.scss";
import type { TakeButtonProps } from "./TakeButton.type";

export const TakeButton = ({
	state,
	disabled,
	onClick,
	className,
}: TakeButtonProps) => (
	<button
		type="button"
		className={clsx(styles.take, className)}
		disabled={disabled}
		onClick={onClick}
	>
		<strong>{TAKE_TEXT[state].title}</strong>
		<span>{TAKE_TEXT[state].caption}</span>
	</button>
);
