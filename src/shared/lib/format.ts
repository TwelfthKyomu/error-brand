export const THING_WORDS: [string, string, string] = ["вещь", "вещи", "вещей"];
export const PIECE_WORDS: [string, string, string] = ["штука", "штуки", "штук"];

export function formatMoney(value: number): string {
	return `${value.toLocaleString("ru-RU")} ₽`;
}

export function plural(value: number, forms: [string, string, string]) {
	const last = value % 10;
	const lastTwo = value % 100;

	if (last === 1 && lastTwo !== 11) return forms[0];
	if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) {
		return forms[1];
	}

	return forms[2];
}
