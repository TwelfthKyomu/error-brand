import type { Client } from "@/shared/lib/admin-api";

export type CheckoutProps = {
	client?: Client;
};

export type CheckoutFormValues = {
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	couponCode: string;
	notes: string;
};
