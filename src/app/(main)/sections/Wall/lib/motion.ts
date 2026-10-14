const DROP_MS = 950;
const TEAR_MS = 1050;
const FLIP_MS = 560;
const FALL_EASING = "cubic-bezier(.45, 0, .75, .45)";
const FLIP_EASING = "cubic-bezier(.2, .85, .2, 1)";

export function prefersReducedMotion(): boolean {
	return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function dropTab(element: HTMLElement, className: string): void {
	if (prefersReducedMotion()) return;

	const rect = element.getBoundingClientRect();
	const ghost = document.createElement("div");
	const direction = Math.random() < 0.5 ? -1 : 1;

	ghost.className = className;
	ghost.style.cssText = `left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px`;
	document.body.append(ghost);

	ghost
		.animate(
			[
				{ transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
				{
					transform: `translate(${direction * 3}px, 12px) rotate(${direction * -6}deg)`,
					opacity: 1,
					offset: 0.18,
				},
				{
					transform: `translate(${direction * 46}px, ${innerHeight * 0.55}px) rotate(${direction * 75}deg)`,
					opacity: 0,
				},
			],
			{ duration: DROP_MS, easing: FALL_EASING }
		)
		.finished.then(() => ghost.remove());
}

export async function tearOff(
	element: HTMLElement,
	rotation: number
): Promise<void> {
	if (prefersReducedMotion()) return;

	await element.animate(
		[
			{ transform: `rotate(${rotation}deg)`, opacity: 1 },
			{
				transform: "translate(8px, -10px) rotate(-3deg)",
				opacity: 1,
				offset: 0.16,
			},
			{
				transform: `translate(-60px, ${innerHeight * 0.9}px) rotate(-42deg)`,
				opacity: 0,
			},
		],
		{ duration: TEAR_MS, easing: FALL_EASING }
	).finished;
}

export function flipFrom(element: HTMLElement, from: DOMRect): void {
	if (prefersReducedMotion()) return;

	const to = element.getBoundingClientRect();

	element.animate(
		[
			{
				transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height}) rotate(-2deg)`,
				opacity: 0.6,
			},
			{ transform: "none", opacity: 1 },
		],
		{ duration: FLIP_MS, easing: FLIP_EASING }
	);
}
