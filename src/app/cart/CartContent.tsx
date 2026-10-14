"use client";

import styles from "./Cart.module.scss";
import CartItems from "./sections/CartItems";
import Checkout from "./sections/Checkout";

import { useCart } from "@/shared/hooks/useCart";
import type { Client } from "@/shared/lib/admin-api";
import { cartQuantity } from "@/shared/lib/cart";
import { THING_WORDS, plural } from "@/shared/lib/format";
import { ButtonLink, EmptyState, LoadingState, PageHeader } from "@/shared/ui";

export const CartContent = ({ client }: { client?: Client }) => {
	const { items, loading, updateQuantity, removeItem } = useCart();
	const count = cartQuantity(items);

	if (loading) return <LoadingState label="Открываем корзину…" />;

	return (
		<div className={styles.page}>
			<PageHeader
				title="Корзина"
				aside={count > 0 && `${count} ${plural(count, THING_WORDS)}`}
			/>

			{items.length === 0 ? (
				<EmptyState
					title="Пусто"
					description="Оторви купон на стене или выбери вещь в списке — она появится здесь."
					action={
						<>
							<ButtonLink href="/">На стену</ButtonLink>
							<ButtonLink href="/collections" variant="outline">
								Списком
							</ButtonLink>
						</>
					}
				/>
			) : (
				<div className={styles.content}>
					<CartItems
						items={items}
						onUpdateQuantity={updateQuantity}
						onRemoveItem={removeItem}
					/>
					<Checkout client={client} />
				</div>
			)}
		</div>
	);
};
