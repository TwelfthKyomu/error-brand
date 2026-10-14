import clsx from "clsx";

import { posterStyle } from "../../lib/style";
import { SECRET_BLANK, SECRET_ORDER } from "../../lib/template";
import poster from "../../Poster.module.scss";

import styles from "./Secret.module.scss";

export const Blank = ({ revealed }: { revealed: boolean }) => (
	<div
		className={clsx(poster.piece, poster.paper, styles.blank)}
		style={posterStyle(SECRET_BLANK, SECRET_ORDER)}
	>
		{revealed && "Пусто. Кто-то успел раньше."}
	</div>
);
