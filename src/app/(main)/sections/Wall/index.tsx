"use client";

import { Hint } from "./components/Hint";
import { Secret } from "./components/Secret";
import { Sheet } from "./components/Sheet";
import { Tile } from "./components/Tile";
import { Toast } from "./components/Toast";
import { useFoundSecret } from "./hooks/useFoundSecret";
import { useToast } from "./hooks/useToast";
import { useWallCart } from "./hooks/useWallCart";
import { useWallPan } from "./hooks/useWallPan";
import { useWallSheet } from "./hooks/useWallSheet";
import { editionProduct, relatedProducts } from "./lib/products";
import styles from "./Wall.module.scss";
import type { FlyerActions, WallProps } from "./Wall.type";

import { categoryName } from "@/shared/lib/product";

const Wall = ({ products, categories, hasSecret }: WallProps) => {
	const { wallRef, worldRef, tiles, moved } = useWallPan();
	const { toast, showToast } = useToast();
	const { tabsFor, tear, announce } = useWallCart(showToast);
	const { opened, open, switchTo, close } = useWallSheet();
	const { found, onFound, onEmpty } = useFoundSecret(showToast);

	const edition = editionProduct(products);
	const actions: FlyerActions = {
		tabsFor,
		categoryOf: product => categoryName(categories, product),
		onTake: tear,
		onOpen: open,
	};

	return (
		<>
			<div
				ref={wallRef}
				className={styles.wall}
				role="region"
				aria-label="Стена с вещами ERROR"
			>
				<div ref={worldRef} className={styles.world}>
					{tiles.map(tile => (
						<Tile
							key={`${tile.column}:${tile.row}`}
							column={tile.column}
							row={tile.row}
							products={products}
							edition={edition}
							total={products.length}
							hasSecret={hasSecret}
							found={found}
							actions={actions}
						/>
					))}
					{hasSecret && (
						<Secret
							actions={actions}
							onFound={onFound}
							onEmpty={onEmpty}
						/>
					)}
				</div>
			</div>

			<div className={styles.vignette} aria-hidden="true" />
			<Hint quiet={moved} />
			<Toast text={toast} />

			{opened && (
				<Sheet
					key={opened.product.id}
					product={opened.product}
					categoryName={categoryName(categories, opened.product)}
					related={relatedProducts(products, opened.product)}
					from={opened.from}
					onTaken={announce}
					onSwitch={switchTo}
					onClose={close}
				/>
			)}
		</>
	);
};

export default Wall;
