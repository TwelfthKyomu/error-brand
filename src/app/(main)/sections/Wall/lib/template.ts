import type { Slot } from "../Wall.type";

export const TILE_WIDTH = 1792;
export const TILE_HEIGHT = 1280;

const FALLBACK_HEIGHT = 330;

export const TEMPLATE: Slot[] = [
	{ kind: "scrap", x: 300, y: 262, w: 150, h: 110, tone: "pink", text: "RR" },
	{ kind: "scrap", x: 760, y: 372, w: 120, h: 84, tone: "blue", text: "E" },
	{ kind: "scrap", x: 1452, y: 380, w: 96, h: 72, tone: "yellow", text: "" },
	{
		kind: "scrap",
		x: 560,
		y: 1130,
		w: 230,
		h: 120,
		tone: "white",
		text: "ERR",
	},
	{
		kind: "scrap",
		x: 930,
		y: 1040,
		w: 190,
		h: 170,
		tone: "yellow",
		text: "O",
	},
	{
		kind: "scrap",
		x: 1400,
		y: 1080,
		w: 260,
		h: 150,
		tone: "blue",
		text: "OR",
	},
	{ kind: "scrap", x: 1700, y: 236, w: 90, h: 160, tone: "white", text: "R" },
	{ kind: "scrap", x: 200, y: 1180, w: 140, h: 80, tone: "pink", text: "" },
	{
		kind: "scrap",
		x: 1180,
		y: 1150,
		w: 120,
		h: 100,
		tone: "white",
		text: "",
	},
	{ kind: "brand", x: 36, y: 40, w: 190, h: 300, r: -1.6, tone: "blue" },
	{
		kind: "brand",
		x: 214,
		y: 52,
		w: 190,
		h: 300,
		r: 0.8,
		tone: "blue",
		tape: true,
	},
	{
		kind: "brand",
		x: 392,
		y: 34,
		w: 190,
		h: 300,
		r: -0.4,
		tone: "blue",
		torn: true,
	},
	{ kind: "flyer", size: "large", x: 612, y: 26, w: 270, r: 1.4, tape: true },
	{ kind: "flyer", size: "large", x: 904, y: 58, w: 270, r: -1.2 },
	{ kind: "edition", x: 1196, y: 30, w: 250, h: 340, r: 2.2 },
	{ kind: "flyer", x: 1474, y: 54, w: 220, r: -2, tape: true },
	{
		kind: "nav",
		to: "catalog",
		x: 52,
		y: 360,
		w: 330,
		h: 180,
		r: -1.2,
		tone: "ink",
	},
	{ kind: "flyer", size: "large", x: 28, y: 566, w: 270, r: 1.6 },
	{ kind: "flyer", x: 330, y: 450, w: 220, r: -1.2 },
	{ kind: "flyer", x: 566, y: 420, w: 220, r: 2, tape: true },
	{ kind: "howto", x: 806, y: 452, w: 260, h: 300, r: -1, tone: "yellow" },
	{ kind: "flyer", x: 1088, y: 412, w: 220, r: -1.6 },
	{ kind: "flyer", x: 1330, y: 430, w: 220, r: 1.2, tape: true },
	{ kind: "flyer", x: 1562, y: 440, w: 210, r: -2.2 },
	{ kind: "clue", x: 24, y: 950, w: 290, h: 210, r: 1.4, tone: "ink" },
	{ kind: "flyer", x: 330, y: 812, w: 220, r: -1 },
	{ kind: "flyer", x: 580, y: 790, w: 220, r: 1.6, tape: true },
	{
		kind: "nav",
		to: "looks",
		x: 826,
		y: 800,
		w: 280,
		h: 210,
		r: -0.8,
		tone: "white",
	},
	{ kind: "flyer", x: 1130, y: 770, w: 220, r: -1.2 },
	{ kind: "flyer", x: 1366, y: 784, w: 220, r: 1, tape: true },
	{ kind: "brand", x: 1568, y: 812, w: 180, h: 250, r: -1.4, tone: "ink" },
	{ kind: "sticker", x: 520, y: 318, w: 86, h: 86, r: -12, tone: "pink" },
	{ kind: "tag", x: 1640, y: 380, w: 0, r: 8, tone: "ink" },
	{ kind: "tag", x: 1040, y: 1046, w: 0, r: -6, tone: "ink" },
];

export const FLYER_INDEX = TEMPLATE.map(
	(slot, order) =>
		TEMPLATE.slice(0, order).filter(
			other =>
				other.kind === "flyer" &&
				(other.size === "large") === (slot.size === "large")
		).length
);

export const LARGE_SLOTS = TEMPLATE.filter(
	slot => slot.kind === "flyer" && slot.size === "large"
).length;

export const REGULAR_SLOTS = TEMPLATE.filter(
	slot => slot.kind === "flyer" && slot.size !== "large"
).length;

export const SECRET_ORDER = TEMPLATE.length;

export const SECRET_FLYER: Slot = {
	kind: "flyer",
	x: TILE_WIDTH + 880,
	y: TILE_HEIGHT + 1000,
	w: 220,
	r: 0.6,
};

export const SECRET_BLANK: Slot = { ...SECRET_FLYER, h: 300 };

export const SECRET_COVER: Slot = {
	kind: "brand",
	x: SECRET_FLYER.x - 20,
	y: SECRET_FLYER.y - 24,
	w: 262,
	h: 350,
	r: 1.4,
};

export function brandFallback(slot: Slot): Slot {
	return { ...slot, h: slot.h ?? FALLBACK_HEIGHT, tone: "pink" };
}
