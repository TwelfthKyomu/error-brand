import type { ReactNode } from "react";

export type WallNoticeProps = {
	code: string;
	title: string;
	text: string;
	children?: ReactNode;
};
