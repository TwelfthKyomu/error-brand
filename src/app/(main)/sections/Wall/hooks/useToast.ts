"use client";

import { useEffect, useState } from "react";

const TOAST_MS = 2800;

export function useToast() {
	const [toast, setToast] = useState<{ id: number; text: string }>();

	useEffect(() => {
		if (!toast) return;

		const timer = window.setTimeout(() => setToast(undefined), TOAST_MS);

		return () => window.clearTimeout(timer);
	}, [toast]);

	const showToast = (text: string) => setToast({ id: Date.now(), text });

	return { toast: toast?.text, showToast };
}
