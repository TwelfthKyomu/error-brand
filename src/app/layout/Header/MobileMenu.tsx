"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

import styles from "./Header.module.scss";
import { MENU_ITEMS } from "./navigation";

export const MobileMenu = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				aria-label={open ? "Закрыть меню" : "Открыть меню"}
				aria-expanded={open}
				className={styles.menuToggle}
				onClick={() => setOpen(!open)}
			>
				{open ? "×" : "≡"}
			</button>
			<nav
				className={clsx(styles.mobileNav, {
					[styles.mobileNavOpen]: open,
				})}
				aria-label="Меню"
			>
				{MENU_ITEMS.map(item => (
					<Link
						key={item.href}
						href={item.href}
						className={styles.mobileLink}
						onClick={() => setOpen(false)}
					>
						{item.label}
					</Link>
				))}
			</nav>
		</>
	);
};
