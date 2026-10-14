"use client";

import { useSecret } from "../../hooks/useSecret";
import { SECRET_FLYER, SECRET_ORDER } from "../../lib/template";
import { Flyer } from "../Flyer";

import { Blank } from "./Blank";
import { Cover } from "./Cover";
import styles from "./Secret.module.scss";
import type { SecretProps } from "./Secret.type";

export const Secret = ({ actions, onFound, onEmpty }: SecretProps) => {
	const { coverRef, product, covered, revealed, wiggle, uncover } = useSecret(
		onFound,
		onEmpty
	);

	return (
		<div className={styles.layer}>
			{product ? (
				<Flyer
					product={product}
					slot={SECRET_FLYER}
					order={SECRET_ORDER}
					actions={actions}
					secret
				/>
			) : (
				<Blank revealed={revealed} />
			)}
			{covered && (
				<Cover ref={coverRef} wiggle={wiggle} onTear={uncover} />
			)}
		</div>
	);
};
