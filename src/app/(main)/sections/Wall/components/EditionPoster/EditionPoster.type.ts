import type { FlyerActions, PosterProps } from "../../Wall.type";

import type { Product } from "@/shared/lib/admin-api";

export type EditionPosterProps = PosterProps & {
	product: Product;
	onOpen: FlyerActions["onOpen"];
};
