"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import type { ResetFormValues } from "../ResetForm.type";

import {
	forgotPasswordAction,
	resetPasswordAction,
} from "@/shared/lib/auth/actions";

export function useResetForm(email: string) {
	const [pending, startTransition] = useTransition();
	const [notice, setNotice] = useState<string>();
	const { register, handleSubmit, formState, setError } =
		useForm<ResetFormValues>({
			defaultValues: { code: "", password: "" },
			mode: "onBlur",
		});

	const onSubmit = handleSubmit(values =>
		startTransition(async () => {
			const result = await resetPasswordAction({
				email,
				code: values.code.trim(),
				password: values.password,
			});

			if (result?.error) setError("root", { message: result.error });
		})
	);

	const resend = () =>
		startTransition(async () => {
			const result = await forgotPasswordAction({ email });

			if (result?.error) {
				setError("root", { message: result.error });

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
