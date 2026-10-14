"use client";

import clsx from "clsx";
import Link from "next/link";

import { useCoarsePointer } from "../../hooks/useCoarsePointer";
import { HINT_TEXT } from "../../lib/messages";

import styles from "./Hint.module.scss";

export const Hint = ({ quiet }: { quiet: boolean }) => {
	const coarse = useCoarsePointer();

	return (
		<p className={clsx(styles.hint, { [styles.quiet]: quiet })}>
			<svg
				viewBox="0 0 24 24"
				aria-hidden="true"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="square"
			>
				<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3" />
			</svg>
			<span>
				{coarse ? HINT_TEXT.touch : HINT_TEXT.mouse} {HINT_TEXT.tear}
			</span>
			<Link href="/collections" className={styles.link}>
				Списком
			</Link>
		</p>
	);
};
