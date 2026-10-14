import clsx from "clsx";

import { RULES } from "../../constants";

import styles from "./Rules.module.scss";

const Rules = () => (
	<section className={styles.rules} aria-label="Как всё устроено">
		{RULES.map((rule, index) => (
			<article
				key={rule.title}
				className={clsx(styles.rule, styles[rule.tone])}
			>
				<span className={styles.number}>0{index + 1}</span>
				<h2 className={styles.title}>{rule.title}</h2>
				<p className={styles.text}>{rule.text}</p>
			</article>
		))}
	</section>
);

export default Rules;
