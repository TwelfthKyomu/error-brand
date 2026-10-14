import type { Category, Product, ProductVariant } from "@/shared/lib/admin-api";

type Tone = "blue" | "pink" | "ink" | "yellow" | "white";

type SlotKind =
	| "flyer"
	| "brand"
	| "edition"
	| "nav"
	| "howto"
	| "clue"
	| "sticker"
	| "tag"
	| "scrap";

export type Slot = {
	kind: SlotKind;
	x: number;
	y: number;
	w: number;
	h?: number;
	r?: number;
	tone?: Tone;
	tape?: boolean;
	torn?: boolean;
	size?: "large";
	to?: "catalog" | "looks";
	text?: string;
};

export type TilePosition = {
	column: number;
	row: number;
};

export type TileProducts = {
	large: Product[];
	regular: Product[];
};

export type Tab = {
	index: number;
	intact: boolean;
	label: string;
	variant?: ProductVariant;
	more?: boolean;
};

export type FlyerActions = {
	tabsFor: (product: Product, count: number) => Tab[];
	categoryOf: (product: Product) => string | undefined;
	onTake: (product: Product, tab: Tab, count: number) => void;
	onOpen: (product: Product, element: HTMLElement) => void;
};

export type Opened = {
	product: Product;
	from?: DOMRect;
};

export type PanState = {
	ox: number;
	oy: number;
	vx: number;
	vy: number;
	scale: number;
	width: number;
	height: number;
	key: string;
	moved: boolean;
	frame: number;
	pointer?: number;
	dragging: boolean;
	distance: number;
	lastX: number;
	lastY: number;
	lastT: number;
	suppressUntil: number;
};

export type PosterProps = {
	slot: Slot;
	order: number;
};

export type WallProps = {
	products: Product[];
	categories: Category[];
	hasSecret: boolean;
};
