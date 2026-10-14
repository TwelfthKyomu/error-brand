import type { Look } from "@/shared/lib/admin-api";

export type LookSpreadProps = {
	look: Look;
	index: number;
};

export type LookPartProps = {
	look: Look;
	active?: number;
	onActivate: (index?: number) => void;
};
