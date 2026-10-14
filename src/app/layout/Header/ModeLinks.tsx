import Link from "next/link";

import styles from "./Header.module.scss";
import { MODES } from "./navigation";

export const ModeLinks = ({ active }: { active?: string }) => (
	<nav className={styles.mode} aria-label="Вид">
		{MODES.map(mode => (
			<Link
				key={mode.href}
				href={mode.href}
				className={styles.modeLink}
				aria-current={mode.href === active ? "page" : undefined}
			>
				{mode.label}
			</Link>
		))}
	</nav>
);
