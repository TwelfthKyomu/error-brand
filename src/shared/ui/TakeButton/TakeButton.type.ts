import type { TakeState } from "@/shared/lib/product";

export type TakeButtonProps = {
	state: TakeState;
	disabled: boolean;
	onClick: () => void;
	className?: string;
};
