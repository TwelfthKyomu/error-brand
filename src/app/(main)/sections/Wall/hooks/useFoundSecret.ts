"use client";

import { useState } from "react";

import { SECRET_EMPTY, SECRET_FOUND } from "../lib/messages";

export function useFoundSecret(showToast: (text: string) => void) {
	const [found, setFound] = useState(false);

	const onFound = (announce: boolean) => {
		setFound(true);

		if (announce) showToast(SECRET_FOUND);
	};

	const onEmpty = () => showToast(SECRET_EMPTY);

	return { found, onFound, onEmpty };
}
