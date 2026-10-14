"use client";

import Link from "next/link";

import styles from "../Auth.module.scss";
import {
	EMAIL_RULES,
	FIRST_NAME_RULES,
	LAST_NAME_RULES,
	PASSWORD_RULES,
} from "../rules";

import { useRegisterForm } from "./hooks/useRegisterForm";
import { VerifyCodeForm } from "./VerifyCodeForm";

import { Button, FormError, Input } from "@/shared/ui";

export const RegisterForm = () => {
	const { register, errors, onSubmit, pending, email, resend } =
		useRegisterForm();

	if (email) return <VerifyCodeForm email={email} onResend={resend} />;

	return (
		<form className={styles.form} onSubmit={onSubmit} noValidate>
			<Input
				label="Имя"
				autoComplete="given-name"
				error={errors.firstName?.message}
				{...register("firstName", FIRST_NAME_RULES)}
			/>
			<Input
				label="Фамилия"
				autoComplete="family-name"
				error={errors.lastName?.message}
				{...register("lastName", LAST_NAME_RULES)}
			/>
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
				autoComplete="new-password"
				placeholder="Минимум 8 символов"
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
				{pending ? "Отправляем код…" : "Создать аккаунт"}
			</Button>

			<p className={styles.alt}>
				Уже есть аккаунт?{" "}
				<Link href="/auth/login" className={styles.link}>
					Войти
				</Link>
			</p>
		</form>
	);
};
