import clsx from "clsx";
import Link from "next/link";

import { Image } from "../Image";
import { Kicker } from "../Kicker";
import { SoldRibbon } from "../SoldRibbon";
import { StackedName } from "../StackedName";

import styles from "./ProductCard.module.scss";
import type { ProductCardProps } from "./ProductCard.type";

import { formatMoney } from "@/shared/lib/format";
import { fluidNameSize } from "@/shared/lib/poster";
import { availabilityLabel, isSoldOut } from "@/shared/lib/product";

export const CardMedia = ({ product, categoryName }: ProductCardProps) => {
	const [cover] = product.images;
	const soldOut = isSoldOut(product);

	return (
		<Link
			href={`/products/${product.slug}`}
			className={clsx(styles.media, { [styles.soldOut]: soldOut })}
			aria-label={`${product.name}, ${formatMoney(product.price)}, ${availabilityLabel(product)}`}
		>
			<Kicker
				category={categoryName}
				featured={product.isFeatured}
				className={styles.kicker}
			/>
			{cover && (
				<span className={styles.photo}>
					<Image src={cover} alt="" className={styles.image} />
				</span>
			)}
			<StackedName
				name={product.name}
				className={clsx(styles.bigName, { [styles.outlined]: cover })}
				style={{ fontSize: fluidNameSize(product.name) }}
			/>
			{soldOut && <SoldRibbon className={styles.sold} />}
		</Link>
	);
};
