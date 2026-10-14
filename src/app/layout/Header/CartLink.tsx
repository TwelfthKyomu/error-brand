"use client";

import Link from "next/link";

import styles from "./Header.module.scss";

import { useCart } from "@/shared/hooks/useCart";
import { cartQuantity } from "@/shared/lib/cart";

export const CartLink = () => {
	const { items } = useCart();
	const count = cartQuantity(items);

	return (
		<Link
			href="/cart"
			className={styles.cart}
			aria-label={`Корзина, вещей: ${count}`}
		>
			<span className={styles.cartLabel}>Корзина</span>
			<b className={styles.count}>{count}</b>
		</Link>
	);
};
