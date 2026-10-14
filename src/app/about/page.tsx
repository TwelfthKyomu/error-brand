import styles from "./About.module.scss";
import Manifest from "./sections/Manifest";
import Rules from "./sections/Rules";

export const metadata = {
	title: "О бренде — ERROR",
	description:
		"ERROR — уличная одежда малыми тиражами. Вещи висят на стене: оторвал купон — вещь твоя.",
};

export default function AboutPage() {
	return (
		<div className={styles.page}>
			<Manifest />
			<Rules />
		</div>
	);
}
