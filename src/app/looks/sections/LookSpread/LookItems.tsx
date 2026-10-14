import clsx from "clsx";
import Link from "next/link";

import { pointLabel } from "../../lib/look";

import styles from "./LookSpread.module.scss";
import type { LookPartProps } from "./LookSpread.type";

import { formatMoney } from "@/shared/lib/format";
import { isSoldOut } from "@/shared/lib/product";

export const LookItems = ({ look, active, onActivate }: LookPartProps) => (
	<ol className={styles.items}>
		{look.items.map((item, index) => (
			<li key={item.product.id}>
				<Link
					href={`/products/${item.product.slug}`}
					className={clsx(styles.item, {
						[styles.itemActive]: index === active,
					})}
					onMouseEnter={() => onActivate(index)}
					onMouseLeave={() => onActivate(undefined)}
				>
					<span className={styles.number}>{pointLabel(index)}</span>
					<span className={styles.name}>{item.product.name}</span>
					<span className={styles.price}>
						{isSoldOut(item.product)
							? "разобрали"
							: formatMoney(item.product.price)}
					</span>
				</Link>
			</li>
		))}
	</ol>
);
