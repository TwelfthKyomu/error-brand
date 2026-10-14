import type { NewCartItem } from "@/shared/lib/cart";
import { THING_WORDS, formatMoney, plural } from "@/shared/lib/format";

export const SECRET_FOUND =
	"Нашёл тайник! Этой вещи нет в каталоге. Оторви купон, пока не забрали.";
export const SECRET_EMPTY = "Тайник пуст: кто-то успел раньше.";

export const CLUE_TEXT = {
	hidden: "Под одной афишей на этой стене спрятана вещь, которой нет в каталоге. Ищи загнутый угол.",
	found: "Тайник на этой стене уже нашли. Следующий спрячем в новом дропе.",
};

export const HINT_TEXT = {
	mouse: "Тяни стену в любую сторону.",
	touch: "Веди пальцем по стене.",
	tear: "Оторви купон снизу листовки — вещь в корзине.",
};

export const NAV_TARGETS: Record<
	"catalog" | "looks",
	{ href: string; title: string }
> = {
	catalog: { href: "/collections", title: "Все вещи" },
	looks: { href: "/looks", title: "Образы" },
};

export function navText(to: "catalog" | "looks", total: number): string {
	return to === "catalog"
		? `Списком: ${total} ${plural(total, THING_WORDS)} с фильтрами и поиском`
		: "Фото, где отмечены вещи. Можно взять образ целиком.";
}

export function takenText(item: NewCartItem): string {
	const name = item.variantLabel
		? `${item.name}, ${item.variantLabel}`
		: item.name;

	return `${name} — в корзине, ${formatMoney(item.price)}`;
}
