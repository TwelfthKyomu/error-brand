import Link from "next/link";

import styles from "./Receipt.module.scss";
import type { ReceiptProps } from "./Receipt.type";

import { formatMoney } from "@/shared/lib/format";
import { ButtonLink, FormError } from "@/shared/ui";

const Receipt = ({ order }: ReceiptProps) => (
	<section className={styles.receipt} aria-label="Состав заказа">
		<ul className={styles.items}>
			{order.items.map((item, index) => (
				<li
					key={`${item.productId}:${item.variantId}:${index}`}
					className={styles.item}
				>
					<span className={styles.name}>{item.name}</span>
					<span className={styles.quantity}>× {item.quantity}</span>
					<b className={styles.amount}>
						{formatMoney(item.totalAmount)}
					</b>
				</li>
			))}
		</ul>

		<dl className={styles.totals}>
			{order.discountAmount > 0 && (
				<div className={styles.row}>
					<dt>Скидка</dt>
					<dd>−{formatMoney(order.discountAmount)}</dd>
				</div>
			)}
			{order.paidAmount > 0 && (
				<div className={styles.row}>
					<dt>Оплачено</dt>
					<dd>{formatMoney(order.paidAmount)}</dd>
				</div>
			)}
			<div className={styles.total}>
				<dt>Итого</dt>
				<dd>{formatMoney(order.totalAmount)}</dd>
			</div>
		</dl>

		<FormError message={order.paymentError} />

		{order.confirmationUrl && order.amountDue > 0 && (
			<ButtonLink
				href={order.confirmationUrl}
				variant="signal"
				size="large"
			>
				Оплатить {formatMoney(order.amountDue)}
			</ButtonLink>
		)}

		<p className={styles.note}>
			Свяжемся с вами, чтобы согласовать доставку. Все заказы — в{" "}
			<Link href="/account">кабинете</Link>.
		</p>
	</section>
);

export default Receipt;
