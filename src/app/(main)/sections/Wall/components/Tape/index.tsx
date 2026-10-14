import { cssVars } from "../../lib/style";

import styles from "./Tape.module.scss";

export const Tape = ({ angle }: { angle: number }) => (
	<span
		className={styles.tape}
		style={cssVars({ "--tr": `${angle}deg` })}
		aria-hidden="true"
	/>
);
