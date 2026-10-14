"use client";

import Link from "next/link";

import styles from "./Checkout.module.scss";
import type { CheckoutProps } from "./Checkout.type";
import { CHECKOUT_RULES } from "./constants";
import { useCheckout } from "./hooks/useCheckout";

import { formatMoney } from "@/shared/lib/format";
import { Button, Input } from "@/shared/ui";

const Checkout = ({ client }: CheckoutProps) => {
	const {
		register,
		couponField,
		applyCoupon,
		couponPending,
		coupon,
		errors,
		onSubmit,
		pending,
		total,
		empty,
	} = useCheckout(client);

	return (
		<form className={styles.checkout} onSubmit={onSubmit} noValidate>
			<h2 className={styles.title}>Оформление</h2>

			<Input
				label="Имя"
				autoComplete="name"
				error={errors.customerName?.message}
				{...register("customerName", CHECKOUT_RULES.customerName)}
			/>
			<Input
				label="Email"
				type="email"
				autoComplete="email"
				readOnly={Boolean(client)}
				error={errors.customerEmail?.message}
				{...register("customerEmail", CHECKOUT_RULES.customerEmail)}
			/>
			<Input
				label="Телефон"
				type="tel"
				autoComplete="tel"
				error={errors.customerPhone?.message}
				{...register("customerPhone", CHECKOUT_RULES.customerPhone)}
			/>
			<div className={styles.coupon}>
				<Input
					label="Промокод"
					autoComplete="off"
					error={errors.couponCode?.message}
					{...couponField}
				/>
				<Button
					type="button"
					variant="outline"
					disabled={couponPending || empty}
					onClick={applyCoupon}
				>
					Применить
				</Button>
			</div>
			<Input
				label="Комментарий к заказу"
				autoComplete="off"
				error={errors.notes?.message}
				{...register("notes", CHECKOUT_RULES.notes)}
			/>

			{errors.root?.message && (
				<p className={styles.error} role="alert">
					{errors.root.message}
				</p>
			)}

			{coupon && (
				<p className={styles.discount}>
					<span>Скидка по промокоду</span>
					<b>−{formatMoney(coupon.discountAmount)}</b>
				</p>
			)}

			<p className={styles.total}>
				<span>Итого</span>
				<b>{formatMoney(total)}</b>
			</p>

			<Button
				type="submit"
				variant="signal"
				size="large"
				disabled={pending || empty}
			>
				Оформить заказ
			</Button>

			<p className={styles.hint}>
				{client ? (
					"Заказ появится в кабинете. Доставку согласуем после оформления."
				) : (
					<>
						<Link href="/auth/login">Войдите</Link>, чтобы заказ
						появился в кабинете. Доставку согласуем после
						оформления.
					</>
				)}
			</p>
			<p className={styles.hint}>
				Это демо-магазин: заказы не исполняются, оплата — тестовой
				картой 4242 4242 4242 4242. Не вводите реальные данные.
			</p>
		</form>
	);
};

export default Checkout;
