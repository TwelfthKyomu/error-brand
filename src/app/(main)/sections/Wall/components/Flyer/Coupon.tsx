import clsx from "clsx";

import { keepRowFocus } from "../../lib/dom";
import { dropTab } from "../../lib/motion";

import styles from "./Flyer.module.scss";
import type { CouponProps } from "./Flyer.type";

export const Coupon = ({ product, tab, count, actions }: CouponProps) => {
	if (!tab.intact) {
		return (
			<span
				className={clsx(styles.tab, styles.stub)}
				aria-hidden="true"
			/>
		);
	}

	if (tab.more) {
		return (
			<button
				type="button"
				className={styles.tab}
				aria-label={`Все варианты: ${product.name}`}
				onClick={event =>
					actions.onOpen(
						product,
						event.currentTarget.closest("article") ??
							event.currentTarget
					)
				}
			>
				<span>ещё</span>
				<b>{tab.label}</b>
			</button>
		);
	}

	return (
		<button
			type="button"
			className={styles.tab}
			aria-label={`Оторвать купон: ${product.name}, ${tab.label}`}
			onClick={event => {
				keepRowFocus(event.currentTarget);
				dropTab(event.currentTarget, styles.ghost);
				actions.onTake(product, tab, count);
			}}
		>
			<span>ERROR</span>
			<b>{tab.label}</b>
		</button>
	);
};
