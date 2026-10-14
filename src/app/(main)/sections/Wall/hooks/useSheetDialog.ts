"use client";

import type { MouseEvent } from "react";
import { useEffect, useEffectEvent, useLayoutEffect, useRef } from "react";

import { trapFocus } from "../lib/dom";
import { flipFrom } from "../lib/motion";

export function useSheetDialog(from: DOMRect | undefined, onClose: () => void) {
	const sheetRef = useRef<HTMLElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	const onKey = useEffectEvent((event: KeyboardEvent) => {
		if (event.key === "Escape") onClose();
		if (event.key === "Tab" && sheetRef.current) {
			trapFocus(event, sheetRef.current);
		}
	});

	useLayoutEffect(() => {
		if (sheetRef.current && from) flipFrom(sheetRef.current, from);
	}, [from]);

	useEffect(() => {
		const previous = document.activeElement;
		const handleKey = (event: KeyboardEvent) => onKey(event);

		closeRef.current?.focus({ preventScroll: true });
		addEventListener("keydown", handleKey);

		return () => {
			removeEventListener("keydown", handleKey);

			if (previous instanceof HTMLElement) {
				previous.focus({ preventScroll: true });
			}
		};
	}, []);

	const onBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) onClose();
	};

	return { sheetRef, closeRef, onBackdropClick };
}
