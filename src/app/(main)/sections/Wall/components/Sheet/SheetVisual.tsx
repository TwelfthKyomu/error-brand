import styles from "./Sheet.module.scss";
import type { SheetVisualProps } from "./Sheet.type";

import { SITE_HOST } from "@/shared/constants/site";
import { Image, Kicker, StackedName } from "@/shared/ui";

export const SheetVisual = ({ product, categoryName }: SheetVisualProps) => {
	const [photo] = product.images;

	return (
		<div className={styles.visual}>
			<Kicker category={categoryName} className={styles.kicker} />
			{photo ? (
				<span className={styles.photo}>
					<Image src={photo} alt={product.name} />
				</span>
			) : (
				<StackedName name={product.name} className={styles.name} />
			)}
			<span className={styles.path}>
				{SITE_HOST}/products/{product.slug}
			</span>
		</div>
	);
};
