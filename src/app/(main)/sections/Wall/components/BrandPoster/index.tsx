import clsx from "clsx";

import { brandFontSize, brandWord, posterStyle } from "../../lib/style";
import poster from "../../Poster.module.scss";
import type { PosterProps } from "../../Wall.type";
import { Tape } from "../Tape";

import styles from "./BrandPoster.module.scss";

import { SITE_HOST } from "@/shared/constants/site";
import { StackedName } from "@/shared/ui";

export const BrandPoster = ({ slot, order }: PosterProps) => (
	<div
		className={clsx(
			poster.piece,
			poster.paper,
			poster[slot.tone ?? "blue"],
			styles.brand,
			{ [styles.torn]: slot.torn }
		)}
		style={posterStyle(slot, order, {
			"--fs": `${brandFontSize(slot.w)}px`,
		})}
		aria-hidden="true"
	>
		<span className={poster.fine}>Одежда</span>
		<StackedName name={brandWord(slot.w)} className={styles.word} />
		<span className={poster.fine}>{SITE_HOST}</span>
		{slot.tape && <Tape angle={order % 2 ? 4 : -3} />}
	</div>
);
