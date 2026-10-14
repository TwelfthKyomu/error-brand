import { notFound } from "next/navigation";

import styles from "./Order.module.scss";
import type { OrderPageProps } from "./Order.type";
import Receipt from "./sections/Receipt";

import { loadOrder } from "@/shared/lib/admin-api";
import {
	ORDER_STATUS_LABEL,
	PAYMENT_STATUS_LABEL,
	formatOrderDate,
	orderNumber,
} from "@/shared/lib/order";
import { PageHeader } from "@/shared/ui";

export const OrderContent = async ({ params }: OrderPageProps) => {
	const { id } = await params;
	const order = await loadOrder(id);

	if (!order) notFound();

	return (
		<div className={styles.page}>
			<PageHeader
				title={`Заказ № ${orderNumber(order)}`}
				aside={`${formatOrderDate(order)} · ${ORDER_STATUS_LABEL[order.status]} · ${PAYMENT_STATUS_LABEL[order.paymentStatus]}`}
			/>
			<Receipt order={order} />
		</div>
	);
};
