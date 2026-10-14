import type { MouseEvent } from "react";

const FOCUSABLE = "button:not(:disabled), a[href]";
const COARSE_POINTER = "(pointer: coarse)";

function isPlainClick(event: MouseEvent): boolean {
	return (
		event.button === 0 &&
		!event.metaKey &&
		!event.ctrlKey &&
		!event.shiftKey &&
		!event.altKey
	);
}

export function openInPlace(
	event: MouseEvent<HTMLElement>,
	open: (element: HTMLElement) => void
): void {
	if (!isPlainClick(event)) return;

	event.preventDefault();
	open(event.currentTarget);
}

export function keepRowFocus(button: HTMLElement): void {
	if (document.activeElement !== button) return;

	const row = button.parentElement;

	requestAnimationFrame(() =>
		row
			?.querySelector<HTMLButtonElement>("button")
			?.focus({ preventScroll: true })
	);
}

export function trapFocus(event: KeyboardEvent, container: HTMLElement): void {
	const focusable = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)];
	const first = focusable[0];
	const last = focusable[focusable.length - 1];

	if (event.shiftKey && document.activeElement === first) {
		event.preventDefault();
		last?.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first?.focus();
	}
}

export function isCoarsePointer(): boolean {
	return matchMedia(COARSE_POINTER).matches;
}

export function subscribeCoarsePointer(listener: () => void): () => void {
	const query = matchMedia(COARSE_POINTER);

	query.addEventListener("change", listener);

	return () => query.removeEventListener("change", listener);
}
