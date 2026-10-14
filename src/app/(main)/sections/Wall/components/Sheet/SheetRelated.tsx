import styles from "./Sheet.module.scss";
import type { SheetRelatedProps } from "./Sheet.type";

import { formatMoney } from "@/shared/lib/format";

export const SheetRelated = ({
	products,
	categoryName,
	onSwitch,
}: SheetRelatedProps) => {
	if (products.length === 0) return null;

	return (
		<div className={styles.related}>
			<h3>
				{categoryName ? `Ещё из «${categoryName}»` : "Ещё на стене"}
			</h3>
			<div>
				{products.map(item => (
					<button
						key={item.id}
						type="button"
						onClick={() => onSwitch(item)}
					>
						{item.name} · {formatMoney(item.price)}
					</button>
				))}
			</div>
		</div>
	);
};
