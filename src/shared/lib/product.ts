import type {
	Category,
	Client,
	Product,
	ProductVariant,
} from "@/shared/lib/admin-api";

export const MAX_QUANTITY = 10;
const LOW_STOCK = 10;

export type TakeState =
	"available" | "taken" | "limit" | "missing" | "variantSoldOut" | "soldOut";

function editionRemaining(product: Product): number | undefined {
	return product.editionSize === undefined
		? undefined
		: Math.max(0, product.editionSize - (product.soldCount ?? 0));
}

export function remainingCount(product: Product): number | undefined {
	const counts = [product.stock, editionRemaining(product)].filter(
		(value): value is number => value !== undefined
	);

	return counts.length > 0 ? Math.min(...counts) : undefined;
}

export function categoryName(
	categories: readonly Category[],
	product: Product
): string | undefined {
	return categories.find(category => category.id === product.categoryId)
		?.name;
}

export function clientName(client: Client): string {
	return [client.firstName, client.lastName].filter(Boolean).join(" ");
}

export function isSoldOut(product: Product): boolean {
	return remainingCount(product) === 0;
}

export function isLowStock(product: Product): boolean {
	const remaining = remainingCount(product);

	return remaining !== undefined && remaining < LOW_STOCK;
}

export function availabilityLabel(product: Product): string {
	const remaining = remainingCount(product);

	if (remaining === 0) return "Разобрали";
	if (product.editionSize !== undefined) {
		return `Тираж ${product.editionSize}, осталось ${remaining}`;
	}
	if (remaining !== undefined && remaining < LOW_STOCK) {
		return `Осталось ${remaining}`;
	}

	return "В наличии";
}

export function initialSelection(product: Product): Record<string, string> {
	const [firstVariant] = product.variants;

	return firstVariant
		? { ...firstVariant.optionValues }
		: Object.fromEntries(
				product.options.map(option => [
					option.name,
					option.values[0] ?? "",
				])
			);
}

export function findVariant(
	product: Product,
	selection: Record<string, string>
): ProductVariant | undefined {
	return product.variants.find(variant =>
		Object.entries(variant.optionValues).every(
			([name, value]) => selection[name] === value
		)
	);
}

export function variantLabel(variant: ProductVariant): string {
	return Object.values(variant.optionValues).join(" / ");
}

export function availableQuantity(
	product: Product,
	variant?: ProductVariant
): number {
	if (product.variants.length > 0 && !variant) return 0;

	const stock = variant ? variant.stock : product.stock;

	return Math.min(
		MAX_QUANTITY,
		stock ?? MAX_QUANTITY,
		editionRemaining(product) ?? MAX_QUANTITY
	);
}

export function takeState(
	product: Product,
	variant: ProductVariant | undefined,
	left: number,
	taken = false
): TakeState {
	if (isSoldOut(product)) return "soldOut";
	if (product.variants.length > 0 && !variant) return "missing";
	if (availableQuantity(product, variant) === 0) return "variantSoldOut";
	if (taken) return "taken";
	if (left <= 0) return "limit";

	return "available";
}
