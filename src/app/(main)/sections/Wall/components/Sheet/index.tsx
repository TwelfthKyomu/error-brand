"use client";

import Link from "next/link";
import { useId } from "react";

import { useSheetDialog } from "../../hooks/useSheetDialog";

import styles from "./Sheet.module.scss";
import type { SheetProps } from "./Sheet.type";
import { SheetRelated } from "./SheetRelated";
import { SheetVisual } from "./SheetVisual";

import { useProductChoice } from "@/shared/hooks/useProductChoice";
import { formatMoney } from "@/shared/lib/format";
import { takeState } from "@/shared/lib/product";
import { OptionPicker, ProductChips, TakeButton } from "@/shared/ui";

export const Sheet = ({
	product,
	categoryName,
	related,
	from,
	onTaken,
	onSwitch,
	onClose,
}: SheetProps) => {
	const titleId = useId();
	const { sheetRef, closeRef, onBackdropClick } = useSheetDialog(
		from,
		onClose
	);
	const { selection, variant, price, inCart, left, select, take } =
		useProductChoice(product);

	return (
		<div className={styles.backdrop} onClick={onBackdropClick}>
			<section
				ref={sheetRef}
				className={styles.sheet}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
			>
				<button
					ref={closeRef}
					type="button"
					className={styles.close}
					aria-label="Закрыть"
					onClick={onClose}
				>
					×
				</button>

				<SheetVisual product={product} categoryName={categoryName} />

				<div className={styles.body}>
					<ProductChips
						product={product}
						categoryName={categoryName}
						className={styles.chips}
					/>
					<h2 id={titleId} className={styles.title}>
						{product.name}
					</h2>
					<p className={styles.price}>{formatMoney(price)}</p>
					<OptionPicker
						options={product.options}
						selection={selection}
						onSelect={select}
					/>
					{inCart > 0 && (
						<p className={styles.note}>В корзине: {inCart}.</p>
					)}
					<TakeButton
						state={takeState(product, variant, left)}
						disabled={left <= 0}
						onClick={() => onTaken(take())}
					/>
					<SheetRelated
						products={related}
						categoryName={categoryName}
						onSwitch={onSwitch}
					/>
					<Link
						href={`/products/${product.slug}`}
						className={styles.link}
					>
						Открыть страницу вещи →
					</Link>
				</div>
			</section>
		</div>
	);
};
