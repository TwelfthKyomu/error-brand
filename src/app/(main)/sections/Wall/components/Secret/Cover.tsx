import clsx from "clsx";

import { posterStyle } from "../../lib/style";
import { SECRET_COVER, SECRET_ORDER } from "../../lib/template";
import poster from "../../Poster.module.scss";

import styles from "./Secret.module.scss";
import type { CoverProps } from "./Secret.type";

import { SITE_HOST } from "@/shared/constants/site";

export const Cover = ({ ref, wiggle, onTear }: CoverProps) => (
	<div
		ref={ref}
		className={clsx(styles.cover, { [styles.wiggle]: wiggle })}
		style={posterStyle(SECRET_COVER, SECRET_ORDER)}
		onClick={onTear}
	>
		<button
			type="button"
			className={styles.sheet}
			aria-label="Афиша с загнутым углом. Сорвать её"
		>
			<span className={styles.word}>
				Не
				<br />
				трогай
			</span>
			<span className={poster.fine}>{SITE_HOST}</span>
		</button>
		<span className={styles.flap} aria-hidden="true" />
	</div>
);
