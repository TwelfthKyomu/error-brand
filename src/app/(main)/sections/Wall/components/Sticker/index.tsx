import clsx from "clsx";
import Link from "next/link";

import { posterStyle } from "../../lib/style";
import poster from "../../Poster.module.scss";
import type { PosterProps } from "../../Wall.type";

import styles from "./Sticker.module.scss";

export const Sticker = ({ slot, order }: PosterProps) => (
	<Link
		href="/collections"
		className={clsx(
			poster.piece,
			poster.paper,
			poster.link,
			poster[slot.tone ?? "pink"],
			styles.sticker
		)}
		style={posterStyle(slot, order)}
		aria-label="Не нашёл вещь? Все вещи списком"
	>
		<b>404</b>
		<span>список</span>
	</Link>
);
