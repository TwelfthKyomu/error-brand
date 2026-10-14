import clsx from "clsx";
import Link from "next/link";

import { catalogHref } from "../../lib/catalogQuery";

import styles from "./Pagination.module.scss";
import type { PaginationProps } from "./Pagination.type";

const Pagination = ({ query, pages }: PaginationProps) => {
	if (pages <= 1) return null;

	const current = query.page ?? 1;

	return (
		<nav className={styles.pagination} aria-label="Страницы каталога">
			{Array.from({ length: pages }, (_, index) => index + 1).map(
				page => (
					<Link
						key={page}
						href={catalogHref(query, {
							page: page > 1 ? page : undefined,
						})}
						className={clsx(styles.page, {
							[styles.current]: page === current,
						})}
						aria-current={page === current ? "page" : undefined}
					>
						{String(page).padStart(2, "0")}
					</Link>
				)
			)}
		</nav>
	);
};

export default Pagination;
