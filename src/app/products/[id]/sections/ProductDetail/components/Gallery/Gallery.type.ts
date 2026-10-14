import type { Product } from "@/shared/lib/admin-api";

export type GalleryProps = {
	product: Product;
	categoryName?: string;
};

export type ThumbnailsProps = {
	images: string[];
	active: number;
	onSelect: (index: number) => void;
};
