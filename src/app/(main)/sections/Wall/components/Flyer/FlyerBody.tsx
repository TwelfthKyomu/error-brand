import clsx from "clsx";
import Link from "next/link";

import { openInPlace } from "../../lib/dom";

import styles from "./Flyer.module.scss";
import type { FlyerBodyProps } from "./Flyer.type";

import { formatMoney } from "@/shared/lib/format";
import { availabilityLabel, isLowStock } from "@/shared/lib/product";
import { Image, Kicker, StackedName } from "@/shared/ui";

export const FlyerBody = ({ product, category, onOpen }: FlyerBodyProps) => {
	const [photo] = product.images;

	return (
		<Link
			href={`/products/${product.slug}`}
			prefetch={false}
			className={styles.body}
			aria-label={`${product.name}, ${formatMoney(product.price)}, ${availabilityLabel(product)}`}
			onClick={event =>
				openInPlace(event, link =>
					onOpen(product, link.parentElement ?? link)
				)
			}
		>
			<Kicker
				category={category}
				className={clsx({ [styles.kickerShort]: product.isFeatured })}
			/>
			<div className={styles.cover}>
				{photo && (
					<span className={styles.photo}>
						<Image src={photo} alt="" />
					</span>
				)}
				<h3 className={clsx(styles.name, { [styles.onPhoto]: photo })}>
					<StackedName name={product.name} />
				</h3>
			</div>
			<span className={styles.row}>
				<span className={styles.price}>
					{formatMoney(product.price)}
				</span>
				<span
					className={clsx(styles.stock, {
						[styles.low]: isLowStock(product),
					})}
				>
					{availabilityLabel(product).toLowerCase()}
				</span>
			</span>
		</Link>
	);
};
