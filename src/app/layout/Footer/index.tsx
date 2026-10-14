import Link from "next/link";

import styles from "./Footer.module.scss";
import { FOOTER_GROUPS } from "./navigation";

import { SITE_HOST } from "@/shared/constants/site";
import { Mark } from "@/shared/ui";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.brand}>
					<Mark className={styles.mark} />
					<p className={styles.word}>ERROR</p>
					<p className={styles.tagline}>
						Уличная одежда. Вещи висят на стене — оторви купон, и
						вещь твоя.
					</p>
				</div>

				<nav className={styles.groups} aria-label="Разделы сайта">
					{FOOTER_GROUPS.map(group => (
						<div key={group.title} className={styles.group}>
							<h2 className={styles.title}>{group.title}</h2>
							<ul className={styles.links}>
								{group.links.map(link => (
									<li key={link.href}>
										<Link href={link.href}>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>

				<p className={styles.bottom}>
					<span>© ERROR</span>
					<span>Демо-магазин: заказы не исполняются</span>
					<span>{SITE_HOST}</span>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
