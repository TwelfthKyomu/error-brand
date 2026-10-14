import type { FlyerActions, Slot, TilePosition } from "../../Wall.type";

import type { Product } from "@/shared/lib/admin-api";

export type TileProps = TilePosition & {
	products: readonly Product[];
	edition?: Product;
	total: number;
	hasSecret: boolean;
	found: boolean;
	actions: FlyerActions;
};

export type SlotPosterProps = {
	slot: Slot;
	order: number;
	product?: Product;
	edition?: Product;
	total: number;
	hasSecret: boolean;
	found: boolean;
	actions: FlyerActions;
};
