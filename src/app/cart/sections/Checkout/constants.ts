import type { RegisterOptions } from "react-hook-form";

import type { CheckoutFormValues } from "./Checkout.type";

import { EMAIL_PATTERN } from "@/shared/lib/validation";

export const CHECKOUT_RULES: Partial<
	Record<keyof CheckoutFormValues, RegisterOptions<CheckoutFormValues>>
> = {
	customerName: {
		required: "Введите имя",
		maxLength: { value: 255, message: "Слишком длинное имя" },
	},
	customerEmail: {
		pattern: {
			value: EMAIL_PATTERN,
			message: "Неверный email",
		},
	},
	customerPhone: {
		maxLength: { value: 32, message: "Слишком длинный номер" },
	},
	notes: {
		maxLength: { value: 2000, message: "Слишком длинный комментарий" },
	},
};
