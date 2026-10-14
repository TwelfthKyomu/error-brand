import styles from "./WallNotice.module.scss";
import type { WallNoticeProps } from "./WallNotice.type";

export const WallNotice = ({
	code,
	title,
	text,
	children,
}: WallNoticeProps) => (
	<section className={styles.wall}>
		<div className={styles.poster}>
			<span className={styles.code} aria-hidden="true">
				{code}
			</span>
			<h1 className={styles.title}>{title}</h1>
			<p className={styles.text}>{text}</p>
			{children && <div className={styles.actions}>{children}</div>}
		</div>
	</section>
);
