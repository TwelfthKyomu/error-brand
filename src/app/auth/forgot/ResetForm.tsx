"use client";

import styles from "../Auth.module.scss";
import { CODE_RULES, PASSWORD_RULES } from "../rules";

import { useResetForm } from "./hooks/useResetForm";
import type { ResetFormProps } from "./ResetForm.type";

import { Button, FormError, Input } from "@/shared/ui";

export const ResetForm = ({ email }: ResetFormProps) => {
	const { register, errors, onSubmit, pending, notice, resend } =
		useResetForm(email);

	return (
		<form className={styles.form} onSubmit={onSubmit} noValidate>
			<p className={styles.alt}>
				Если аккаунт с почтой {email} есть, мы отправили на неё код.
			</p>

			<Input
				label="Код из письма"
				inputMode="numeric"
				autoComplete="one-time-code"
				placeholder="123456"
				maxLength={6}
				error={errors.code?.message}
				{...register("code", CODE_RULES)}
			/>
			<Input
				label="Новый пароль"
				type="password"
				autoComplete="new-password"
				placeholder="Минимум 8 символов"
				error={errors.password?.message}
				{...register("password", PASSWORD_RULES)}
			/>

			<FormError message={errors.root?.message} />
			{notice && !errors.root && <p className={styles.alt}>{notice}</p>}

			<Button
				type="submit"
				variant="signal"
				size="large"
				disabled={pending}
			>
				{pending ? "Сохраняем…" : "Сохранить пароль"}
			</Button>

			<p className={styles.alt}>
				Не пришло письмо?{" "}
				<button
					type="button"
					className={styles.link}
					onClick={resend}
					disabled={pending}
				>
					Отправить ещё раз
				</button>
			</p>
		</form>
	);
};
