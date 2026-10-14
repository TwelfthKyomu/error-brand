import styles from "./Related.module.scss";
import type { RelatedProps } from "./Related.type";

import { categoryName } from "@/shared/lib/product";
import { ProductCard } from "@/shared/ui";

const Related = ({ products, categories }: RelatedProps) => {
	if (products.length === 0) return null;

	return (
		<section className={styles.section}>
			<h2 className={styles.title}>Ещё на стене</h2>
			<div className={styles.grid}>
				{products.map(product => (
					<ProductCard
						key={product.id}
						product={product}
						categoryName={categoryName(categories, product)}
					/>
				))}
			</div>
		</section>
	);
};

export default Related;
