import type { PanState, TilePosition } from "../Wall.type";

import { TILE_HEIGHT, TILE_WIDTH } from "./template";

const PRELOAD = 360;
const DRAG_THRESHOLD = 6;
const FRICTION = 0.935;
const STOP_SPEED = 0.04;
const CLICK_GUARD_MS = 60;
const FLING_WINDOW_MS = 90;
const FOCUS_PADDING = 90;
const LINE_HEIGHT = 32;
const ARROW_SPEED = 16;
const ARROW_STEP = 160;
const DRIFT = { vx: -3.2, vy: -1.1 };

export const INITIAL_TILES: TilePosition[] = [
	{ column: -1, row: -1 },
	{ column: 0, row: -1 },
	{ column: -1, row: 0 },
	{ column: 0, row: 0 },
];

export const ARROWS: Record<string, [number, number]> = {
	ArrowLeft: [1, 0],
	ArrowRight: [-1, 0],
	ArrowUp: [0, 1],
	ArrowDown: [0, -1],
};

export function baseScale(width: number): number {
	if (width < 560) return 0.74;
	if (width < 1100) return 0.86;

	return Math.min(1.12, width / 1440);
}

export function createPanState(): PanState {
	return {
		ox: 0,
		oy: 34,
		vx: 0,
		vy: 0,
		scale: baseScale(innerWidth),
		width: innerWidth,
		height: innerHeight,
		key: "",
		moved: false,
		frame: 0,
		dragging: false,
		distance: 0,
		lastX: 0,
		lastY: 0,
		lastT: 0,
		suppressUntil: 0,
	};
}

export function resizePan(state: PanState): void {
	state.scale = baseScale(innerWidth);
	state.width = innerWidth;
	state.height = innerHeight;
	state.key = "";
}

export function worldTransform(state: PanState): string {
	const x = state.width / 2 + (state.ox - state.width / 2) * state.scale;
	const y = state.height / 2 + (state.oy - state.height / 2) * state.scale;

	return `translate3d(${x}px, ${y}px, 0) scale(${state.scale})`;
}

export function visibleTiles(state: PanState): {
	key: string;
	tiles: TilePosition[];
} {
	const { width, height, scale } = state;
	const left = width / 2 - width / (2 * scale) - state.ox - PRELOAD;
	const right = width / 2 + width / (2 * scale) - state.ox + PRELOAD;
	const top = height / 2 - height / (2 * scale) - state.oy - PRELOAD;
	const bottom = height / 2 + height / (2 * scale) - state.oy + PRELOAD;
	const columns = [
		Math.floor(left / TILE_WIDTH),
		Math.floor(right / TILE_WIDTH),
	];
	const rows = [
		Math.floor(top / TILE_HEIGHT),
		Math.floor(bottom / TILE_HEIGHT),
	];
	const tiles: TilePosition[] = [];

	for (let row = rows[0]; row <= rows[1]; row++) {
		for (let column = columns[0]; column <= columns[1]; column++) {
			tiles.push({ column, row });
		}
	}

	return { key: `${columns.join(":")}/${rows.join(":")}`, tiles };
}

export function stepInertia(state: PanState): boolean {
	if (state.dragging) return false;

	state.ox += state.vx;
	state.oy += state.vy;
	state.vx *= FRICTION;
	state.vy *= FRICTION;

	if (Math.hypot(state.vx, state.vy) >= STOP_SPEED) return true;

	state.vx = 0;
	state.vy = 0;

	return false;
}

export function markMoved(state: PanState): boolean {
	if (state.moved) return false;

	state.moved = true;

	return true;
}

export function startPointer(
	state: PanState,
	pointerId: number,
	x: number,
	y: number
): void {
	state.pointer = pointerId;
	state.dragging = false;
	state.distance = 0;
	state.lastX = x;
	state.lastY = y;
	state.lastT = performance.now();
	state.vx = 0;
	state.vy = 0;
}

export function movePointer(
	state: PanState,
	x: number,
	y: number
): "idle" | "start" | "drag" {
	const dx = x - state.lastX;
	const dy = y - state.lastY;

	state.lastX = x;
	state.lastY = y;
	state.distance += Math.abs(dx) + Math.abs(dy);

	if (!state.dragging && state.distance <= DRAG_THRESHOLD) return "idle";

	const started = !state.dragging;
	const { scale } = state;
	const now = performance.now();
	const dt = Math.max(8, now - state.lastT);

	state.dragging = true;
	state.ox += dx / scale;
	state.oy += dy / scale;
	state.vx = state.vx * 0.5 + (dx / scale) * (16 / dt) * 0.5;
	state.vy = state.vy * 0.5 + (dy / scale) * (16 / dt) * 0.5;
	state.lastT = now;

	return started ? "start" : "drag";
}

export function releasePointer(state: PanState, reduced: boolean): void {
	const now = performance.now();

	if (state.dragging) {
		state.suppressUntil = now + CLICK_GUARD_MS;

		if (reduced || now - state.lastT > FLING_WINDOW_MS) {
			state.vx = 0;
			state.vy = 0;
		}
	}

	state.pointer = undefined;
	state.dragging = false;
}

export function isClickSuppressed(state: PanState): boolean {
	return performance.now() < state.suppressUntil;
}

export function scrollBy(state: PanState, event: WheelEvent): void {
	const { scale } = state;
	const unit = event.deltaMode === 1 ? LINE_HEIGHT : 1;
	const dx = event.shiftKey ? event.deltaY : event.deltaX;
	const dy = event.shiftKey ? 0 : event.deltaY;

	state.ox -= (dx * unit) / scale;
	state.oy -= (dy * unit) / scale;
	state.vx = 0;
	state.vy = 0;
}

export function isInView(rect: DOMRect): boolean {
	return (
		rect.left >= FOCUS_PADDING &&
		rect.right <= innerWidth - FOCUS_PADDING &&
		rect.top >= FOCUS_PADDING &&
		rect.bottom <= innerHeight - FOCUS_PADDING
	);
}

export function centerOn(state: PanState, rect: DOMRect): void {
	const { scale } = state;

	state.ox += (innerWidth / 2 - (rect.left + rect.width / 2)) / scale;
	state.oy += (innerHeight / 2 - (rect.top + rect.height / 2)) / scale;
	state.vx = 0;
	state.vy = 0;
}

export function nudge(
	state: PanState,
	[x, y]: [number, number],
	reduced: boolean
): void {
	if (reduced) {
		state.ox += x * ARROW_STEP;
		state.oy += y * ARROW_STEP;

		return;
	}

	state.vx = x * ARROW_SPEED;
	state.vy = y * ARROW_SPEED;
}

export function startDrift(state: PanState): boolean {
	if (state.pointer !== undefined || state.vx || state.vy) return false;

	state.vx = DRIFT.vx;
	state.vy = DRIFT.vy;

	return true;
}
