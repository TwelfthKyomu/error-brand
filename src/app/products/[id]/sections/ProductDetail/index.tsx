"use client";

import Link from "next/link";

import { Gallery } from "./components/Gallery";
import { usePurchase } from "./hooks/usePurchase";
import styles from "./ProductDetail.module.scss";
import type { ProductDetailProps } from "./ProductDetail.type";

import { PIECE_WORDS, formatMoney, plural } from "@/shared/lib/format";
import {
	OptionPicker,
	ProductChips,
	QuantityControl,
	TakeButton,
} from "@/shared/ui";

const ProductDetail = ({ product, categoryName }: ProductDetailProps) => {
	const {
		selection,
		price,
		inCart,
		left,
		quantity,
		state,
		select,
		setQuantity,
		take,
	} = usePurchase(product);

	return (
		<section className={styles.product}>
			<Gallery product={product} categoryName={categoryName} />

			<div className={styles.info}>
				<ProductChips product={product} categoryName={categoryName} />
				<h1 className={styles.name}>{product.name}</h1>
				<p className={styles.price}>{formatMoney(price)}</p>

				<OptionPicker
					options={product.options}
					selection={selection}
					onSelect={select}
				/>

				<div className={styles.buy}>
					{left > 0 && (
						<QuantityControl
							value={quantity}
							onChange={setQuantity}
							min={1}
							max={left}
						/>
					)}
					<TakeButton
						state={state}
						disabled={left <= 0}
						onClick={take}
						className={styles.take}
					/>
				</div>

				{inCart > 0 && (
					<Link href="/cart" className={styles.link}>
						В корзине: {inCart}. Перейти в корзину →
					</Link>
				)}

				{product.editionSize !== undefined && (
					<p className={styles.note}>
						Тираж ограничен: {product.editionSize}{" "}
						{plural(product.editionSize, PIECE_WORDS)}.
					</p>
				)}

				{product.description && (
					<p className={styles.description}>{product.description}</p>
				)}
			</div>
		</section>
	);
};

export default ProductDetail;
