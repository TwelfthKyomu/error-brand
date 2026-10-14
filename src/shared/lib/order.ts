import type { Order, OrderStatus, PaymentStatus } from "@/shared/lib/admin-api";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
	pending: "Принят",
	confirmed: "Подтверждён",
	in_progress: "Собираем",
	completed: "Выполнен",
	cancelled: "Отменён",
	no_show: "Не забран",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
	unpaid: "Не оплачен",
	partial: "Оплачен частично",
	paid: "Оплачен",
	refunded: "Деньги возвращены",
};

export function orderNumber(order: Pick<Order, "id">): string {
	return order.id.slice(0, 8).toUpperCase();
}

export function formatOrderDate(order: Pick<Order, "createdAt">): string {
	return new Date(order.createdAt).toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}
