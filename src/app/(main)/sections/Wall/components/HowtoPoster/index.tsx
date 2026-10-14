import clsx from "clsx";

import { posterStyle } from "../../lib/style";
import poster from "../../Poster.module.scss";
import type { PosterProps } from "../../Wall.type";

import styles from "./HowtoPoster.module.scss";

export const HowtoPoster = ({ slot, order }: PosterProps) => (
	<div
		className={clsx(
			poster.piece,
			poster.paper,
			poster[slot.tone ?? "yellow"],
			styles.howto
		)}
		style={posterStyle(slot, order)}
	>
		<p className={styles.title}>
			Оторви
			<br />
			купон
		</p>
		<p className={styles.text}>
			Каждая листовка на стене — вещь. Оторвал купон снизу — вещь в
			корзине. Купонов столько, сколько вещей осталось.
		</p>
		<span className={styles.tabs} aria-hidden="true">
			<i />
			<i />
			<i className={styles.gone} />
			<i />
			<i className={styles.gone} />
			<i />
		</span>
	</div>
);
