"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { checkoutAction, previewCouponAction } from "../../../actions";
import type { CheckoutFormValues } from "../Checkout.type";
import { checkoutDefaults, checkoutInput } from "../lib/checkout";

import { useCart } from "@/shared/hooks/useCart";
import type { Client, CouponPreview } from "@/shared/lib/admin-api";

export function useCheckout(client?: Client) {
	const router = useRouter();
	const [pending, startTransition] = useTransition();
	const [couponPending, startCouponCheck] = useTransition();
	const [coupon, setCoupon] = useState<CouponPreview>();
	const { items, total, clear } = useCart();
	const {
		register,
		handleSubmit,
		formState,
		setError,
		clearErrors,
		getValues,
	} = useForm<CheckoutFormValues>({
		defaultValues: checkoutDefaults(client),
		mode: "onBlur",
	});

	const applyCoupon = () =>
		startCouponCheck(async () => {
			const input = checkoutInput(getValues(), items);

			if (!input.couponCode) return;

			const result = await previewCouponAction(input);

			setCoupon(result.preview);

			if (result.error) {
				setError("couponCode", { message: result.error });

				return;
			}

			clearErrors("couponCode");
		});

	const couponField = register("couponCode", {
		onChange: () => setCoupon(undefined),
	});

	const onSubmit = handleSubmit(values => {
		if (!values.customerEmail.trim() && !values.customerPhone.trim()) {
			setError("customerPhone", { message: "Укажите email или телефон" });

			return;
		}

		startTransition(async () => {
			const result = await checkoutAction(checkoutInput(values, items));

			if (result.error || !result.orderId) {
				setError("root", {
					message: result.error ?? "Не удалось оформить заказ",
				});

				return;
			}

			clear();

			if (result.confirmationUrl) {
				window.location.assign(result.confirmationUrl);

				return;
			}

			router.push(`/orders/${result.orderId}`);
		});
	});

	return {
		register,
		couponField,
		applyCoupon,
		couponPending,
		coupon,
		errors: formState.errors,
		onSubmit,
		pending,
		total: coupon?.totalAmount ?? total,
		empty: items.length === 0,
	};
}
