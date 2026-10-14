"use client";

import Link from "next/link";

import styles from "./ProductCard.module.scss";
import type { CardTakeProps } from "./ProductCard.type";

import { useProductChoice } from "@/shared/hooks/useProductChoice";
import { isSoldOut } from "@/shared/lib/product";

export const CardTake = ({ product }: CardTakeProps) => {
	const { inCart, left, take } = useProductChoice(product);
	const soldOut = isSoldOut(product);

	if (product.variants.length > 0 && !soldOut) {
		return (
			<Link href={`/products/${product.slug}`} className={styles.take}>
				<span>Выбрать размер</span>
				<span aria-hidden="true">→</span>
			</Link>
		);
	}

	return (
		<button
			type="button"
			className={styles.take}
			disabled={left <= 0}
			onClick={() => take()}
		>
			<span>
				{soldOut ? "Разобрали" : left <= 0 ? "Больше нет" : "В корзину"}
			</span>
			<span>{inCart > 0 ? `в корзине ${inCart}` : "+"}</span>
		</button>
	);
};
