"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import type { VerifyCodeFormValues } from "../VerifyCodeForm.type";

import { verifyAction } from "@/shared/lib/auth/actions";

export function useVerifyCode(
	email: string,
	onResend: () => Promise<string | undefined>
) {
	const [pending, startTransition] = useTransition();
	const [notice, setNotice] = useState<string>();
	const { register, handleSubmit, formState, setError } =
		useForm<VerifyCodeFormValues>({ defaultValues: { code: "" } });

	const onSubmit = handleSubmit(values =>
		startTransition(async () => {
			const result = await verifyAction({
				email,
				code: values.code.trim(),
			});

			if (result?.error) setError("root", { message: result.error });
		})
	);

	const resend = () =>
		startTransition(async () => {
			const error = await onResend();

			if (error) {
				setError("root", { message: error });

				return;
			}

			setNotice("Отправили новый код");
		});

	return {
		register,
		errors: formState.errors,
		onSubmit,
		pending,
		notice,
		resend,
	};
}
