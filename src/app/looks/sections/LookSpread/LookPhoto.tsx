import clsx from "clsx";
import Link from "next/link";

import { pointLabel } from "../../lib/look";

import styles from "./LookSpread.module.scss";
import type { LookPartProps } from "./LookSpread.type";

import { Image } from "@/shared/ui";

export const LookPhoto = ({ look, active, onActivate }: LookPartProps) => (
	<div className={styles.photo}>
		<Image src={look.image} alt={look.title} className={styles.image} />
		{look.items.map((item, index) => (
			<Link
				key={item.product.id}
				href={`/products/${item.product.slug}`}
				className={clsx(styles.marker, {
					[styles.markerActive]: index === active,
				})}
				style={{ left: `${item.x}%`, top: `${item.y}%` }}
				onMouseEnter={() => onActivate(index)}
				onMouseLeave={() => onActivate(undefined)}
				aria-label={item.product.name}
			>
				{pointLabel(index)}
			</Link>
		))}
	</div>
);
