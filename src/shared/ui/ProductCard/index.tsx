import clsx from "clsx";
import Link from "next/link";

import { CardMedia } from "./CardMedia";
import { CardTake } from "./CardTake";
import styles from "./ProductCard.module.scss";
import type { ProductCardProps } from "./ProductCard.type";

import { formatMoney } from "@/shared/lib/format";
import { availabilityLabel, isLowStock } from "@/shared/lib/product";

export const ProductCard = ({ product, categoryName }: ProductCardProps) => (
	<article className={styles.card}>
		<CardMedia product={product} categoryName={categoryName} />

		<div className={styles.line}>
			<h3 className={styles.name}>
				<Link href={`/products/${product.slug}`}>{product.name}</Link>
			</h3>
			<b className={styles.price}>{formatMoney(product.price)}</b>
		</div>
		<p className={styles.meta}>
			<span className={clsx({ [styles.low]: isLowStock(product) })}>
				{availabilityLabel(product)}
			</span>
		</p>
		<CardTake product={product} />
	</article>
);
