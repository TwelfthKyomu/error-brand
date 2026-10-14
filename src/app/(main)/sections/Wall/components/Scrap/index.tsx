import clsx from "clsx";

import { tornClip } from "../../lib/random";
import { posterStyle } from "../../lib/style";
import poster from "../../Poster.module.scss";
import type { PosterProps } from "../../Wall.type";

import styles from "./Scrap.module.scss";

export const Scrap = ({ slot, order }: PosterProps) => (
	<div
		className={clsx(
			poster.piece,
			poster[slot.tone ?? "white"],
			styles.scrap
		)}
		style={posterStyle(slot, order, {
			"--clip": tornClip(`scrap-${order}`, 14),
		})}
		aria-hidden="true"
	>
		<span>{slot.text}</span>
	</div>
);
