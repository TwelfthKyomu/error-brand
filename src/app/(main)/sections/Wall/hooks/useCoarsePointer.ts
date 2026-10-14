"use client";

import { useSyncExternalStore } from "react";

import { isCoarsePointer, subscribeCoarsePointer } from "../lib/dom";

export function useCoarsePointer(): boolean {
	return useSyncExternalStore(
		subscribeCoarsePointer,
		isCoarsePointer,
		() => false
	);
}
