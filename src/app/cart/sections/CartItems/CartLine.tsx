import styles from "./CartItems.module.scss";
import type { CartLineProps } from "./CartItems.type";

import { formatMoney } from "@/shared/lib/format";
import { MAX_QUANTITY } from "@/shared/lib/product";
import { Image, QuantityControl, StackedName } from "@/shared/ui";

export const CartLine = ({
	item,
	onUpdateQuantity,
	onRemoveItem,
}: CartLineProps) => (
	<li className={styles.line}>
		<span className={styles.thumb}>
			{item.image ? (
				<Image src={item.image} alt="" />
			) : (
				<StackedName name="ERR OR" className={styles.placeholder} />
			)}
		</span>

		<div className={styles.info}>
			<h2 className={styles.name}>{item.name}</h2>
			{item.variantLabel && (
				<span className={styles.variant}>{item.variantLabel}</span>
			)}
			<span className={styles.price}>
				{formatMoney(item.price * item.quantity)}
			</span>
		</div>

		<div className={styles.controls}>
			<QuantityControl
				value={item.quantity}
				onChange={quantity => onUpdateQuantity(item.id, quantity)}
				min={1}
				max={MAX_QUANTITY}
			/>
			<button
				type="button"
				className={styles.remove}
				onClick={() => onRemoveItem(item.id)}
				aria-label={`Убрать из корзины: ${item.name}`}
			>
				Убрать
			</button>
		</div>
	</li>
);
