const CLIP_STEPS = 6;

function seeded(seed: string): () => number {
	let state = 7;

	for (const char of seed) state = (state * 31 + char.charCodeAt(0)) >>> 0;

	return () => {
		state = (state * 1664525 + 1013904223) >>> 0;

		return state / 4294967296;
	};
}

export function shuffledIndexes(seed: string, count: number): number[] {
	const random = seeded(seed);
	const order = Array.from({ length: count }, (_, index) => index);

	for (let i = order.length - 1; i > 0; i--) {
		const swap = Math.floor(random() * (i + 1));

		[order[i], order[swap]] = [order[swap], order[i]];
	}

	return order;
}

function clipPoint(x: number, y: number): string {
	return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
}

function clipStep(index: number): number {
	return (index / CLIP_STEPS) * 100;
}

export function tornClip(seed: string, amplitude: number): string {
	const random = seeded(seed);
	const points: string[] = [];

	for (let i = 0; i < CLIP_STEPS; i++) {
		points.push(clipPoint(clipStep(i), random() * amplitude));
	}

	for (let i = 0; i < CLIP_STEPS; i++) {
		points.push(clipPoint(100 - random() * amplitude, clipStep(i)));
	}

	for (let i = CLIP_STEPS; i > 0; i--) {
		points.push(clipPoint(clipStep(i), 100 - random() * amplitude));
	}

	for (let i = CLIP_STEPS; i > 0; i--) {
		points.push(clipPoint(random() * amplitude, clipStep(i)));
	}

	return `polygon(${points.join(",")})`;
}
