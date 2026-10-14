export type Client = {
	id: string;
	firstName: string;
	lastName?: string;
	email: string;
	phone?: string;
};

export type AuthResult = {
	client: Client;
	token: string;
	expiresAt: string;
};

export type RegisterResult = {
	email: string;
};

export type OrderStatus =
	| "pending"
	| "confirmed"
	| "in_progress"
	| "completed"
	| "cancelled"
	| "no_show";

export type PaymentStatus = "unpaid" | "partial" | "paid" | "refunded";

export type OrderItem = {
	productId?: string;
	variantId?: string;
	name: string;
	quantity: number;
	unitPriceAmount: number;
	totalAmount: number;
};

export type Order = {
	id: string;
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	currency: string;
	subtotalAmount: number;
	discountAmount: number;
	totalAmount: number;
	paidAmount: number;
	refundedAmount: number;
	amountDue: number;
	createdAt: string;
	items: OrderItem[];
	confirmationUrl?: string;
	paymentError?: string;
};

export type OrderInput = {
	customerName: string;
	customerEmail?: string;
	customerPhone?: string;
	items: {
		productId: string;
		variantId?: string;
		quantity: number;
	}[];
	couponCode?: string;
	notes?: string;
	payment?: {
		returnUrl: string;
	};
};

export type MeResponse = {
	client: Client;
	orders: Order[];
};

type ProductBadge = {
	code: string;
	label: string;
	color: string;
};

export type ProductOption = {
	name: string;
	values: string[];
};

export type ProductVariant = {
	id: string;
	optionValues: Record<string, string>;
	price: number;
	stock?: number;
};

export type Product = {
	id: string;
	type: "physical" | "service";
	name: string;
	slug: string;
	description?: string;
	price: number;
	currency: string;
	categoryId?: string;
	images: string[];
	badges: ProductBadge[];
	stock?: number;
	editionSize?: number;
	soldCount?: number;
	options: ProductOption[];
	variants: ProductVariant[];
	isFeatured: boolean;
};

export type Category = {
	id: string;
	parentId?: string;
	name: string;
	slug: string;
	position: number;
};

export type Catalog = {
	currency: string;
	total: number;
	categories: Category[];
	products: Product[];
};

export type ProductResponse = {
	currency: string;
	categories: Category[];
	product: Product;
};

export type CatalogSort = "featured" | "newest" | "price_asc" | "price_desc";

export type CatalogOptions = {
	page?: number;
	limit?: number;
	categorySlug?: string;
	featured?: boolean;
	type?: Product["type"];
	search?: string;
	inStock?: boolean;
	sort?: CatalogSort;
};

export type LookItem = {
	x: number;
	y: number;
	product: Product;
};

export type Look = {
	id: string;
	title: string;
	description?: string;
	image: string;
	items: LookItem[];
};

export type CouponPreview = {
	discountAmount: number;
	totalAmount: number;
};
