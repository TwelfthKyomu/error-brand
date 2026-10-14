import clsx from "clsx";
import Link from "next/link";

import { CATALOG_SORTS, catalogHref } from "../../lib/catalogQuery";

import styles from "./Filters.module.scss";
import type { FiltersProps } from "./Filters.type";

const Filters = ({ query, categories }: FiltersProps) => {
	const roots = categories.filter(category => !category.parentId);

	return (
		<div className={styles.filters}>
			<form action="/collections" className={styles.search} role="search">
				{query.category && (
					<input
						type="hidden"
						name="category"
						value={query.category}
					/>
				)}
				{query.sort && (
					<input type="hidden" name="sort" value={query.sort} />
				)}
				{query.inStock && (
					<input type="hidden" name="inStock" value="true" />
				)}
				{query.featured && (
					<input type="hidden" name="featured" value="true" />
				)}
				<input
					type="search"
					name="q"
					defaultValue={query.q}
					placeholder="Поиск по названию"
					aria-label="Поиск по названию"
					className={styles.searchInput}
				/>
				<button type="submit" className={styles.searchButton}>
					Найти
				</button>
			</form>

			<nav className={styles.chips} aria-label="Категории">
				<Link
					href={catalogHref(query, { category: undefined })}
					className={clsx(styles.chip, {
						[styles.active]: !query.category,
					})}
				>
					Все
				</Link>
				{roots.map(category => (
					<Link
						key={category.id}
						href={catalogHref(query, { category: category.slug })}
						className={clsx(styles.chip, {
							[styles.active]: query.category === category.slug,
						})}
					>
						{category.name}
					</Link>
				))}
			</nav>

			<div className={styles.row}>
				<div className={styles.toggles}>
					<Link
						href={catalogHref(query, {
							inStock: !query.inStock || undefined,
						})}
						className={clsx(styles.toggle, {
							[styles.active]: query.inStock,
						})}
					>
						<span className={styles.box} aria-hidden="true" />В
						наличии
					</Link>
					<Link
						href={catalogHref(query, {
							featured: !query.featured || undefined,
						})}
						className={clsx(styles.toggle, {
							[styles.active]: query.featured,
						})}
					>
						<span className={styles.box} aria-hidden="true" />
						Выбор ERROR
					</Link>
				</div>

				<nav className={styles.sorts} aria-label="Сортировка">
					{CATALOG_SORTS.map(option => (
						<Link
							key={option.value}
							href={catalogHref(query, {
								sort:
									option.value === "featured"
										? undefined
										: option.value,
							})}
							className={clsx(styles.sort, {
								[styles.active]:
									(query.sort ?? "featured") === option.value,
							})}
						>
							{option.label}
						</Link>
					))}
				</nav>
			</div>
		</div>
	);
};

export default Filters;
