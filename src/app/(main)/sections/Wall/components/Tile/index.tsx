import { slotProduct, tileProducts } from "../../lib/products";
import { TEMPLATE, TILE_HEIGHT, TILE_WIDTH } from "../../lib/template";

import { SlotPoster } from "./SlotPoster";
import styles from "./Tile.module.scss";
import type { TileProps } from "./Tile.type";

export const Tile = ({
	column,
	row,
	products,
	edition,
	total,
	hasSecret,
	found,
	actions,
}: TileProps) => {
	const assigned = tileProducts(products, column, row);

	return (
		<div
			className={styles.tile}
			style={{
				left: column * TILE_WIDTH,
				top: row * TILE_HEIGHT,
				width: TILE_WIDTH,
				height: TILE_HEIGHT,
			}}
		>
			{TEMPLATE.map((slot, order) => (
				<SlotPoster
					key={order}
					slot={slot}
					order={order}
					product={slotProduct(assigned, slot, order)}
					edition={edition}
					total={total}
					hasSecret={hasSecret}
					found={found}
					actions={actions}
				/>
			))}
		</div>
	);
};
