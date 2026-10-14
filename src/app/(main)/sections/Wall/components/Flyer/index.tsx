import clsx from "clsx";

import { flyerFontSize, flyerPaper, posterStyle } from "../../lib/style";
import { tabCount } from "../../lib/tabs";
import poster from "../../Poster.module.scss";
import { Tape } from "../Tape";

import { Coupon } from "./Coupon";
import styles from "./Flyer.module.scss";
import type { FlyerProps } from "./Flyer.type";
import { FlyerBody } from "./FlyerBody";

import { isSoldOut } from "@/shared/lib/product";
import { PickBadge, SoldRibbon } from "@/shared/ui";

export const Flyer = ({
	product,
	slot,
	order,
	actions,
	secret,
}: FlyerProps) => {
	const count = tabCount(slot.w);
	const soldOut = isSoldOut(product);

	return (
		<article
			className={clsx(poster.piece, styles.flyer, {
				[styles.dark]: secret,
				[styles.soldOut]: soldOut,
			})}
			style={posterStyle(slot, order, {
				"--fs": `${flyerFontSize(product.name, slot)}px`,
				"--bg": flyerPaper(product, order, secret),
			})}
		>
			<FlyerBody
				product={product}
				category={secret ? "Тайник" : actions.categoryOf(product)}
				onOpen={actions.onOpen}
			/>

			<div className={styles.tabs}>
				{actions.tabsFor(product, count).map(tab => (
					<Coupon
						key={tab.index}
						product={product}
						tab={tab}
						count={count}
						actions={actions}
					/>
				))}
			</div>

			{product.isFeatured && !secret && <PickBadge />}
			{soldOut && <SoldRibbon />}
			{slot.tape && <Tape angle={order % 2 ? 3 : -4} />}
		</article>
	);
};
