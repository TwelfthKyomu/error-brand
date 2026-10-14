import clsx from "clsx";

import { CLUE_TEXT } from "../../lib/messages";
import { posterStyle } from "../../lib/style";
import poster from "../../Poster.module.scss";

import styles from "./CluePoster.module.scss";
import type { CluePosterProps } from "./CluePoster.type";

export const CluePoster = ({ slot, order, found }: CluePosterProps) => (
	<div
		className={clsx(poster.piece, poster.paper, poster.ink, styles.clue)}
		style={posterStyle(slot, order)}
	>
		<span className={styles.title}>Тайник</span>
		<span className={styles.text}>
			{found ? CLUE_TEXT.found : CLUE_TEXT.hidden}
		</span>
	</div>
);
