import Link from "next/link";
import { Suspense } from "react";

import { CartLink } from "./CartLink";
import styles from "./Header.module.scss";
import { MobileMenu } from "./MobileMenu";
import { ModeLinks } from "./ModeLinks";
import { ModeSwitch } from "./ModeSwitch";
import { NAV_ITEMS } from "./navigation";

import { Mark } from "@/shared/ui";

const Header = () => {
	return (
		<header className={styles.header}>
			<Link href="/" className={styles.logo} aria-label="ERROR, на стену">
				<Mark className={styles.mark} />
				<span className={styles.logoText}>ERROR</span>
			</Link>

			<div className={styles.actions}>
				<Suspense fallback={<ModeLinks />}>
					<ModeSwitch />
				</Suspense>
				<nav className={styles.nav} aria-label="Разделы">
					{NAV_ITEMS.map(item => (
						<Link
							key={item.href}
							href={item.href}
							className={styles.label}
						>
							{item.label}
						</Link>
					))}
				</nav>
				<CartLink />
				<MobileMenu />
			</div>
		</header>
	);
};

export default Header;
