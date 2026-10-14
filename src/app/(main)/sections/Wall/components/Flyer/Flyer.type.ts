import type { FlyerActions, Slot, Tab } from "../../Wall.type";

import type { Product } from "@/shared/lib/admin-api";

export type FlyerProps = {
	product: Product;
	slot: Slot;
	order: number;
	actions: FlyerActions;
	secret?: boolean;
};

export type FlyerBodyProps = {
	product: Product;
	category?: string;
	onOpen: FlyerActions["onOpen"];
};

export type CouponProps = {
	product: Product;
	tab: Tab;
	count: number;
	actions: FlyerActions;
};
