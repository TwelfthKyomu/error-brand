import clsx from "clsx";
import Link from "next/link";

import { NAV_TARGETS, navText } from "../../lib/messages";
import { posterStyle } from "../../lib/style";
import poster from "../../Poster.module.scss";

import styles from "./NavPoster.module.scss";
import type { NavPosterProps } from "./NavPoster.type";

export const NavPoster = ({ slot, order, total }: NavPosterProps) => {
	const to = slot.to ?? "catalog";

	return (
		<Link
			href={NAV_TARGETS[to].href}
			className={clsx(
				poster.piece,
				poster.paper,
				poster.link,
				poster[slot.tone ?? "ink"],
				styles.nav
			)}
			style={posterStyle(slot, order)}
		>
			<span className={styles.title}>{NAV_TARGETS[to].title}</span>
			<span className={styles.text}>{navText(to, total)}</span>
			<span className={styles.arrow} aria-hidden="true">
				→
			</span>
		</Link>
	);
};
