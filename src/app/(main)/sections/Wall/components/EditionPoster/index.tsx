import clsx from "clsx";
import Link from "next/link";

import { openInPlace } from "../../lib/dom";
import { posterStyle } from "../../lib/style";
import poster from "../../Poster.module.scss";

import styles from "./EditionPoster.module.scss";
import type { EditionPosterProps } from "./EditionPoster.type";

import { PIECE_WORDS, plural } from "@/shared/lib/format";
import { remainingCount } from "@/shared/lib/product";

export const EditionPoster = ({
	slot,
	order,
	product,
	onOpen,
}: EditionPosterProps) => {
	const remaining = remainingCount(product) ?? 0;

	return (
		<Link
			href={`/products/${product.slug}`}
			prefetch={false}
			className={clsx(
				poster.piece,
				poster.paper,
				poster.link,
				poster.pink,
				styles.edition
			)}
			style={posterStyle(slot, order)}
			aria-label={`${product.name}: тираж ${product.editionSize}, осталось ${remaining}`}
			onClick={event => openInPlace(event, link => onOpen(product, link))}
		>
			<span className={styles.top}>
				<span>ERROR</span>
				<span>{product.name}</span>
			</span>
			<span className={styles.label}>Тираж</span>
			<span className={styles.number}>{product.editionSize}</span>
			<span className={styles.left}>
				осталось <b>{remaining}</b> {plural(remaining, PIECE_WORDS)}
			</span>
		</Link>
	);
};
