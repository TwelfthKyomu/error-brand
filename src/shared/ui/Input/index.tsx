"use client";

import clsx from "clsx";
import { useId } from "react";

import styles from "./Input.module.scss";
import type { InputProps } from "./Input.type";

export const Input = ({
	label,
	error,
	id,
	className,
	...props
}: InputProps) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const errorId = `${inputId}-error`;

	return (
		<div className={clsx(styles.field, className)}>
			{label && (
				<label htmlFor={inputId} className={styles.label}>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={clsx(styles.input, { [styles.invalid]: error })}
				aria-invalid={error ? true : undefined}
				aria-describedby={error ? errorId : undefined}
				{...props}
			/>
			{error && (
				<span id={errorId} className={styles.error}>
					{error}
				</span>
			)}
		</div>
	);
};
