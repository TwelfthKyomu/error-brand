"use client";

import clsx from "clsx";
import Link from "next/link";

import { lookTotal, pointLabel } from "../../lib/look";

import { useLook } from "./hooks/useLook";
import { LookItems } from "./LookItems";
import { LookPhoto } from "./LookPhoto";
import styles from "./LookSpread.module.scss";
import type { LookSpreadProps } from "./LookSpread.type";

import { THING_WORDS, formatMoney, plural } from "@/shared/lib/format";
import { Button } from "@/shared/ui";

const LookSpread = ({ look, index }: LookSpreadProps) => {
	const { active, setActive, taken, takeAll, readyCount, choiceCount } =
		useLook(look);

	return (
		<article
			className={clsx(styles.spread, {
				[styles.reversed]: index % 2 === 1,
			})}
		>
			<LookPhoto look={look} active={active} onActivate={setActive} />

			<div className={styles.composition}>
				<div className={styles.heading}>
					<span>Образ {pointLabel(index)}</span>
					<span>
						{look.items.length}{" "}
						{plural(look.items.length, THING_WORDS)}
					</span>
				</div>
				<h2 className={styles.title}>{look.title}</h2>
				{look.description && (
					<p className={styles.description}>{look.description}</p>
				)}

				<LookItems look={look} active={active} onActivate={setActive} />

				<p className={styles.total}>
					<span>Весь образ</span>
					<b>{formatMoney(lookTotal(look))}</b>
				</p>

				{readyCount > 0 && (
					<Button variant="signal" size="large" onClick={takeAll}>
						{taken ? "Образ в корзине" : "Взять весь образ"}
					</Button>
				)}
				{choiceCount > 0 && (
					<p className={styles.note}>
						У {choiceCount} {plural(choiceCount, THING_WORDS)} нужно
						выбрать размер или их уже разобрали — открой по номеру.
					</p>
				)}
				{taken && (
					<Link href="/cart" className={styles.toCart}>
						Перейти в корзину →
					</Link>
				)}
			</div>
		</article>
	);
};

export default LookSpread;
