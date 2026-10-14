"use client";

import { startTransition, useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "../lib/motion";
import {
	ARROWS,
	INITIAL_TILES,
	centerOn,
	createPanState,
	isClickSuppressed,
	isInView,
	markMoved,
	movePointer,
	nudge,
	releasePointer,
	resizePan,
	scrollBy,
	startDrift,
	startPointer,
	stepInertia,
	visibleTiles,
	worldTransform,
} from "../lib/pan";

const DRIFT_DELAY = 1500;

export function useWallPan() {
	const wallRef = useRef<HTMLDivElement>(null);
	const worldRef = useRef<HTMLDivElement>(null);
	const [tiles, setTiles] = useState(INITIAL_TILES);
	const [moved, setMoved] = useState(false);

	useEffect(() => {
		const wall = wallRef.current;
		const world = worldRef.current;

		if (!wall || !world) return;

		const reduced = prefersReducedMotion();
		const state = createPanState();
		const page = document.documentElement;

		const layout = () => {
			const visible = visibleTiles(state);

			world.style.transform = worldTransform(state);

			if (visible.key === state.key) return;

			state.key = visible.key;
			startTransition(() => setTiles(visible.tiles));
		};

		const frame = () => {
			state.frame = 0;

			const gliding = stepInertia(state);

			layout();

			if (gliding) kick();
		};

		const kick = () => {
			if (!state.frame) state.frame = requestAnimationFrame(frame);
		};

		const noteMove = () => {
			if (markMoved(state)) startTransition(() => setMoved(true));
		};

		const onPointerDown = (event: PointerEvent) => {
			if (event.button !== 0 || state.pointer !== undefined) return;

			startPointer(state, event.pointerId, event.clientX, event.clientY);
		};

		const onPointerMove = (event: PointerEvent) => {
			if (event.pointerId !== state.pointer) return;

			const step = movePointer(state, event.clientX, event.clientY);

			if (step === "start") {
				wall.dataset.dragging = "true";
				wall.setPointerCapture(event.pointerId);
				noteMove();
			}

			if (step !== "idle") kick();
		};

		const onPointerUp = (event: PointerEvent) => {
			if (event.pointerId !== state.pointer) return;

			releasePointer(state, reduced);
			delete wall.dataset.dragging;
			kick();
		};

		const onClickCapture = (event: MouseEvent) => {
			if (!isClickSuppressed(state)) return;

			event.preventDefault();
			event.stopPropagation();
		};

		const onWheel = (event: WheelEvent) => {
			event.preventDefault();
			scrollBy(state, event);
			noteMove();
			kick();
		};

		const onFocusIn = (event: FocusEvent) => {
			if (!(event.target instanceof HTMLElement)) return;

			const rect = event.target.getBoundingClientRect();

			if (isInView(rect)) return;

			centerOn(state, rect);
			kick();
		};

		const onKeyDown = (event: KeyboardEvent) => {
			const direction = ARROWS[event.key];
			const active = document.activeElement;

			if (!direction) return;
			if (active && active !== document.body && !wall.contains(active)) {
				return;
			}

			event.preventDefault();
			nudge(state, direction, reduced);
			kick();
		};

		const onResize = () => {
			resizePan(state);
			kick();
		};

		wall.addEventListener("pointerdown", onPointerDown);
		wall.addEventListener("click", onClickCapture, true);
		wall.addEventListener("wheel", onWheel, { passive: false });
		wall.addEventListener("focusin", onFocusIn);
		addEventListener("pointermove", onPointerMove);
		addEventListener("pointerup", onPointerUp);
		addEventListener("pointercancel", onPointerUp);
		addEventListener("keydown", onKeyDown);
		addEventListener("resize", onResize);

		page.dataset.wall = "true";
		layout();

		const drift = window.setTimeout(() => {
			if (!reduced && startDrift(state)) kick();
		}, DRIFT_DELAY);

		return () => {
			delete page.dataset.wall;
			window.clearTimeout(drift);
			cancelAnimationFrame(state.frame);
			wall.removeEventListener("pointerdown", onPointerDown);
			wall.removeEventListener("click", onClickCapture, true);
			wall.removeEventListener("wheel", onWheel);
			wall.removeEventListener("focusin", onFocusIn);
			removeEventListener("pointermove", onPointerMove);
			removeEventListener("pointerup", onPointerUp);
			removeEventListener("pointercancel", onPointerUp);
			removeEventListener("keydown", onKeyDown);
			removeEventListener("resize", onResize);
		};
	}, []);

	return { wallRef, worldRef, tiles, moved };
}
