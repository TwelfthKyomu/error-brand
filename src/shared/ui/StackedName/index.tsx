import clsx from "clsx";

import styles from "./StackedName.module.scss";
import type { StackedNameProps } from "./StackedName.type";

export const StackedName = ({ name, className, style }: StackedNameProps) => (
	<span className={clsx(styles.name, className)} style={style}>
		{name.split(" ").map((word, index) => (
			<span key={`${word}-${index}`}>{word}</span>
		))}
	</span>
);
