import type { CheckoutInput } from "../../../actions";
import type { CheckoutFormValues } from "../Checkout.type";

import type { Client } from "@/shared/lib/admin-api";
import type { CartItem } from "@/shared/lib/cart";
import { clientName } from "@/shared/lib/product";

export function checkoutDefaults(client?: Client): CheckoutFormValues {
	return {
		customerName: client ? clientName(client) : "",
		customerEmail: client?.email ?? "",
		customerPhone: client?.phone ?? "",
		couponCode: "",
		notes: "",
	};
}

export function checkoutInput(
	values: CheckoutFormValues,
	items: readonly CartItem[]
): CheckoutInput {
	return {
		customerName: values.customerName.trim(),
		customerEmail: values.customerEmail.trim().toLowerCase(),
		customerPhone: values.customerPhone.trim(),
		couponCode: values.couponCode.trim(),
		notes: values.notes.trim(),
		items: items.map(({ productId, variantId, quantity }) => ({
			productId,
			variantId,
			quantity,
		})),
	};
}
