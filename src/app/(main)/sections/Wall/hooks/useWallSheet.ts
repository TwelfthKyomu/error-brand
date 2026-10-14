"use client";

import { useState } from "react";

import type { Opened } from "../Wall.type";

import type { Product } from "@/shared/lib/admin-api";

export function useWallSheet() {
	const [opened, setOpened] = useState<Opened>();

	const open = (product: Product, element: HTMLElement) =>
		setOpened({ product, from: element.getBoundingClientRect() });

	const switchTo = (product: Product) => setOpened({ product });

	const close = () => setOpened(undefined);

	return { opened, open, switchTo, close };
}
