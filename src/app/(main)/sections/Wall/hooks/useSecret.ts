"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

import { revealSecret } from "../../../actions";
import { prefersReducedMotion, tearOff } from "../lib/motion";
import { readFoundSecret, rememberFoundSecret } from "../lib/secret";
import { SECRET_COVER } from "../lib/template";

import type { Product } from "@/shared/lib/admin-api";

const WIGGLE_THRESHOLD = 0.6;

export function useSecret(
	onFound: (announce: boolean) => void,
	onEmpty: () => void
) {
	const coverRef = useRef<HTMLDivElement>(null);
	const tearingRef = useRef(false);
	const [product, setProduct] = useState<Product>();
	const [covered, setCovered] = useState(true);
	const [revealed, setRevealed] = useState(false);
	const [wiggle, setWiggle] = useState(false);

	const restore = useEffectEvent((found: Product) => {
		setProduct(found);
		setRevealed(true);
		setCovered(false);
		onFound(false);
	});

	useEffect(() => {
		const stored = readFoundSecret();

		if (!stored) return;

		revealSecret().then(found => {
			if (found?.slug === stored) restore(found);
		});
	}, []);

	useEffect(() => {
		const cover = coverRef.current;

		if (!cover || !covered || prefersReducedMotion()) return;

		const observer = new IntersectionObserver(
			entries => {
				if (!entries.some(entry => entry.isIntersecting)) return;

				setWiggle(true);
				observer.disconnect();
			},
			{ threshold: WIGGLE_THRESHOLD }
		);

		observer.observe(cover);

		return () => observer.disconnect();
	}, [covered]);

	const uncover = () => {
		const cover = coverRef.current;

		if (!cover || tearingRef.current) return;

		tearingRef.current = true;
		setWiggle(false);
		tearOff(cover, SECRET_COVER.r ?? 0).then(() => setCovered(false));

		revealSecret().then(found => {
			setRevealed(true);

			if (!found) {
				onEmpty();

				return;
			}

			setProduct(found);
			rememberFoundSecret(found.slug);
			onFound(true);
		});
	};

	return { coverRef, product, covered, revealed, wiggle, uncover };
}
