import clsx from "clsx";

import { posterStyle } from "../../lib/style";
import poster from "../../Poster.module.scss";
import type { PosterProps } from "../../Wall.type";

import styles from "./Tag.module.scss";

export const Tag = ({ slot, order }: PosterProps) => (
	<span
		className={clsx(
			poster.piece,
			poster.paper,
			poster[slot.tone ?? "ink"],
			styles.tag
		)}
		style={posterStyle(slot, order)}
		aria-hidden="true"
	>
		<span className={styles.word}>ERROR</span>
	</span>
);
