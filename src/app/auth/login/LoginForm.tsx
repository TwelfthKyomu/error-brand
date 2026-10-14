"use client";

import Link from "next/link";

import styles from "../Auth.module.scss";
import { EMAIL_RULES, PASSWORD_RULES } from "../rules";

import { useLoginForm } from "./hooks/useLoginForm";

import { Button, FormError, Input } from "@/shared/ui";

export const LoginForm = () => {
	const { register, errors, onSubmit, pending } = useLoginForm();

	return (
		<form className={styles.form} onSubmit={onSubmit} noValidate>
			<Input
				label="Email"
				type="email"
				autoComplete="email"
				placeholder="you@example.com"
				error={errors.email?.message}
				{...register("email", EMAIL_RULES)}
			/>
			<Input
				label="Пароль"
				type="password"
				autoComplete="current-password"
				error={errors.password?.message}
				{...register("password", PASSWORD_RULES)}
			/>

			<FormError message={errors.root?.message} />

			<Button
				type="submit"
				variant="signal"
				size="large"
				disabled={pending}
			>
				{pending ? "Входим…" : "Войти"}
			</Button>

			<p className={styles.alt}>
				<Link href="/auth/forgot" className={styles.link}>
					Забыли пароль?
				</Link>
			</p>

			<p className={styles.alt}>
				Нет аккаунта?{" "}
				<Link href="/auth/register" className={styles.link}>
					Зарегистрироваться
				</Link>
			</p>
		</form>
	);
};
