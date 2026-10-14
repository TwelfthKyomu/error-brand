import clsx from "clsx";

import styles from "./ProductChips.module.scss";
import type { ProductChipsProps } from "./ProductChips.type";

import { availabilityLabel, isLowStock } from "@/shared/lib/product";

export const ProductChips = ({
	product,
	categoryName,
	className,
}: ProductChipsProps) => (
	<div className={clsx(styles.chips, className)}>
		{categoryName && <span className={styles.chip}>{categoryName}</span>}
		<span
			className={clsx(styles.chip, {
				[styles.low]: isLowStock(product),
			})}
		>
			{availabilityLabel(product)}
		</span>
		{product.isFeatured && (
			<span className={clsx(styles.chip, styles.pick)}>Выбор ERROR</span>
		)}
	</div>
);
