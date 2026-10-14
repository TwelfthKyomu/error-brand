export const POSTER_LETTER = 0.46;
export const POSTER_PADDING = 28;

const CARD_NAME_LIMIT = 22;

export function longestWord(text: string): number {
	return Math.max(...text.split(" ").map(word => word.length));
}

export function fluidNameSize(name: string): string {
	const scale = (1 / (longestWord(name) * POSTER_LETTER)).toFixed(4);

	return `min(${CARD_NAME_LIMIT}cqi, calc((100cqi - ${POSTER_PADDING}px) * ${scale}))`;
}
