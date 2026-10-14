"use client";

import Link from "next/link";

import styles from "../Auth.module.scss";
import { EMAIL_RULES } from "../rules";

import { useForgotForm } from "./hooks/useForgotForm";
import { ResetForm } from "./ResetForm";

import { Button, FormError, Input } from "@/shared/ui";

export const ForgotForm = () => {
	const { register, errors, onSubmit, pending, email } = useForgotForm();

	if (email) return <ResetForm email={email} />;

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

			<FormError message={errors.root?.message} />

			<Button
				type="submit"
				variant="signal"
				size="large"
				disabled={pending}
			>
				{pending ? "Отправляем код…" : "Прислать код"}
			</Button>

			<p className={styles.alt}>
				Вспомнили пароль?{" "}
				<Link href="/auth/login" className={styles.link}>
					Войти
				</Link>
			</p>
		</form>
	);
};
