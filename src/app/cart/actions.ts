"use server";

import { headers } from "next/headers";

import {
	AdminApiError,
	type CouponPreview,
	createOrder,
	previewCoupon,
} from "@/shared/lib/admin-api";
import { getCurrentClient } from "@/shared/lib/auth/session";

export type CheckoutInput = {
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	couponCode: string;
	notes: string;
	items: {
		productId: string;
		variantId?: string;
		quantity: number;
	}[];
};

export type CheckoutResult = {
	error?: string;
	orderId?: string;
	confirmationUrl?: string;
};

export async function checkoutAction(
	input: CheckoutInput
): Promise<CheckoutResult> {
	const [client, requestHeaders] = await Promise.all([
		getCurrentClient(),
		headers(),
	]);
	const origin = requestHeaders.get("origin") ?? "";

	try {
		const order = await createOrder({
			customerName: input.customerName,
			customerEmail: client?.email ?? (input.customerEmail || undefined),
			customerPhone: input.customerPhone || undefined,
			items: input.items,
			couponCode: input.couponCode || undefined,
			notes: input.notes || undefined,
			payment: origin
				? { returnUrl: `${origin}/orders/{orderId}` }
				: undefined,
		});

		return { orderId: order.id, confirmationUrl: order.confirmationUrl };
	} catch (error) {
		return {
			error:
				error instanceof AdminApiError
					? error.message
					: "Не удалось оформить заказ",
		};
	}
}

export type CouponPreviewResult = {
	preview?: CouponPreview;
	error?: string;
};

export async function previewCouponAction(
	input: Pick<CheckoutInput, "couponCode" | "items">
): Promise<CouponPreviewResult> {
	try {
		return {
			preview: await previewCoupon({
				code: input.couponCode,
				items: input.items,
			}),
		};
	} catch (error) {
		return {
			error:
				error instanceof AdminApiError
					? error.message
					: "Не удалось проверить промокод",
		};
	}
}
