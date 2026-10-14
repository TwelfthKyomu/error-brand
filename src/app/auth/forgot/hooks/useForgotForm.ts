"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import type { ForgotFormValues } from "../ForgotForm.type";

import { forgotPasswordAction } from "@/shared/lib/auth/actions";
import { normalizeEmail } from "@/shared/lib/validation";

export function useForgotForm() {
	const [pending, startTransition] = useTransition();
	const [email, setEmail] = useState<string>();
	const { register, handleSubmit, formState, setError } =
		useForm<ForgotFormValues>({
			defaultValues: { email: "" },
			mode: "onBlur",
		});

	const onSubmit = handleSubmit(values => {
		const input = { email: normalizeEmail(values.email) };

		startTransition(async () => {
			const result = await forgotPasswordAction(input);

			if (result?.error) {
				setError("root", { message: result.error });

				return;
			}

			setEmail(input.email);
		});
	});

	return { register, errors: formState.errors, onSubmit, pending, email };
}
