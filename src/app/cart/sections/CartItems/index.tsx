import styles from "./CartItems.module.scss";
import type { CartItemsProps } from "./CartItems.type";
import { CartLine } from "./CartLine";

const CartItems = ({
	items,
	onUpdateQuantity,
	onRemoveItem,
}: CartItemsProps) => (
	<ul className={styles.list} aria-label="Вещи в корзине">
		{items.map(item => (
			<CartLine
				key={item.id}
				item={item}
				onUpdateQuantity={onUpdateQuantity}
				onRemoveItem={onRemoveItem}
			/>
		))}
	</ul>
);

export default CartItems;
