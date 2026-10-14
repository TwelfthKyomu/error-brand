"use client";

import styles from "../Auth.module.scss";
import { CODE_RULES } from "../rules";

import { useVerifyCode } from "./hooks/useVerifyCode";
import type { VerifyCodeFormProps } from "./VerifyCodeForm.type";

import { Button, FormError, Input } from "@/shared/ui";

export const VerifyCodeForm = ({ email, onResend }: VerifyCodeFormProps) => {
	const { register, errors, onSubmit, pending, notice, resend } =
		useVerifyCode(email, onResend);

	return (
		<form className={styles.form} onSubmit={onSubmit} noValidate>
			<p className={styles.alt}>
				Отправили код на {email}. Введите его, чтобы подтвердить почту.
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

			<FormError message={errors.root?.message} />
			{notice && !errors.root && <p className={styles.alt}>{notice}</p>}

			<Button
				type="submit"
				variant="signal"
				size="large"
				disabled={pending}
			>
				{pending ? "Проверяем…" : "Подтвердить"}
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
