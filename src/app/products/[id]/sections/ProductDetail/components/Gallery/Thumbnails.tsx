import styles from "./Gallery.module.scss";
import type { ThumbnailsProps } from "./Gallery.type";

import { Image } from "@/shared/ui";

export const Thumbnails = ({ images, active, onSelect }: ThumbnailsProps) => (
	<div className={styles.thumbnails}>
		{images.map((src, index) => (
			<button
				key={src}
				type="button"
				className={styles.thumbnail}
				aria-pressed={index === active}
				aria-label={`Фото ${index + 1}`}
				onClick={() => onSelect(index)}
			>
				<Image src={src} alt="" className={styles.image} />
			</button>
		))}
	</div>
);
