import Link from "next/link";

import styles from "./Orders.module.scss";
import type { OrdersProps } from "./Orders.type";

import { formatMoney } from "@/shared/lib/format";
import {
	ORDER_STATUS_LABEL,
	formatOrderDate,
	orderNumber,
} from "@/shared/lib/order";
import { ButtonLink, EmptyState } from "@/shared/ui";

const Orders = ({ orders }: OrdersProps) => {
	if (orders.length === 0) {
		return (
			<EmptyState
				title="Заказов нет"
				description="Как только оформишь первый заказ, он появится здесь."
				action={<ButtonLink href="/">На стену</ButtonLink>}
				className={styles.empty}
			/>
		);
	}

	return (
		<section className={styles.orders} aria-labelledby="orders-title">
			<h2 id="orders-title" className={styles.title}>
				Заказы
			</h2>
			<ul className={styles.list}>
				{orders.map(order => (
					<li key={order.id}>
						<Link
							href={`/orders/${order.id}`}
							className={styles.order}
						>
							<span className={styles.number}>
								№ {orderNumber(order)}
							</span>
							<span className={styles.date}>
								{formatOrderDate(order)}
							</span>
							<span className={styles.status}>
								{ORDER_STATUS_LABEL[order.status]}
							</span>
							<b className={styles.amount}>
								{formatMoney(order.totalAmount)}
							</b>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Orders;
