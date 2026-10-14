import type { ProductOption } from "@/shared/lib/admin-api";

export type OptionPickerProps = {
	options: ProductOption[];
	selection: Record<string, string>;
	onSelect: (name: string, value: string) => void;
};
