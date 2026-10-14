import type { TakeState } from "@/shared/lib/product";

export const TAKE_TEXT: Record<TakeState, { title: string; caption: string }> =
	{
		available: {
			title: "Оторвать купон",
			caption: "Вещь сразу окажется в корзине",
		},
		taken: { title: "Купон у тебя", caption: "Вещь лежит в корзине" },
		limit: { title: "Больше нет", caption: "Ты взял всё, что осталось" },
		missing: {
			title: "Нет такого варианта",
			caption: "Выбери другое сочетание",
		},
		variantSoldOut: {
			title: "Разобрали",
			caption: "Этот вариант закончился, выбери другой",
		},
		soldOut: { title: "Разобрали", caption: "Эту вещь уже разобрали" },
	};
