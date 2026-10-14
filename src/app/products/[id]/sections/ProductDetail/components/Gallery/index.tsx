"use client";

import { useState } from "react";

import styles from "./Gallery.module.scss";
import type { GalleryProps } from "./Gallery.type";
import { Thumbnails } from "./Thumbnails";

import { Image, Kicker, PickBadge, StackedName } from "@/shared/ui";

export const Gallery = ({ product, categoryName }: GalleryProps) => {
	const [active, setActive] = useState(0);
	const image = product.images[active] ?? product.images[0];

	return (
		<div className={styles.gallery}>
			<div className={styles.visual}>
				<Kicker category={categoryName} className={styles.kicker} />
				{image ? (
					<span className={styles.photo}>
						<Image
							key={image}
							src={image}
							alt={product.name}
							loading="eager"
							className={styles.image}
						/>
					</span>
				) : (
					<span className={styles.name} aria-hidden="true">
						<StackedName name={product.name} />
					</span>
				)}
				{product.isFeatured && <PickBadge className={styles.pick} />}
			</div>

			{product.images.length > 1 && (
				<Thumbnails
					images={product.images}
					active={active}
					onSelect={setActive}
				/>
			)}
		</div>
	);
};
