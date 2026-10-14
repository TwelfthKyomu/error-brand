"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import type { LoginFormValues } from "../LoginForm.type";

import { loginAction } from "@/shared/lib/auth/actions";
import { normalizeEmail } from "@/shared/lib/validation";

const LOGIN_DEFAULTS: LoginFormValues = { email: "", password: "" };

export function useLoginForm() {
	const [pending, startTransition] = useTransition();
	const { register, handleSubmit, formState, setError } =
		useForm<LoginFormValues>({
			defaultValues: LOGIN_DEFAULTS,
			mode: "onBlur",
		});

	const onSubmit = handleSubmit(values =>
		startTransition(async () => {
			const result = await loginAction({
				email: normalizeEmail(values.email),
				password: values.password,
			});

			if (result?.error) setError("root", { message: result.error });
		})
	);

	return { register, errors: formState.errors, onSubmit, pending };
}
