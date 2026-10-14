"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import type { RegisterFormValues } from "../RegisterForm.type";

import { registerAction } from "@/shared/lib/auth/actions";
import { normalizeEmail } from "@/shared/lib/validation";

const REGISTER_DEFAULTS: RegisterFormValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
};

export function useRegisterForm() {
	const [pending, startTransition] = useTransition();
	const [submitted, setSubmitted] = useState<RegisterFormValues>();
	const { register, handleSubmit, formState, setError } =
		useForm<RegisterFormValues>({
			defaultValues: REGISTER_DEFAULTS,
			mode: "onBlur",
		});

	const onSubmit = handleSubmit(values => {
		const input = {
			firstName: values.firstName.trim(),
			lastName: values.lastName.trim(),
			email: normalizeEmail(values.email),
			password: values.password,
		};

		startTransition(async () => {
			const result = await registerAction(input);

			if (result?.error) {
				setError("root", { message: result.error });

				return;
			}

			setSubmitted(input);
		});
	});

	const resend = async () =>
		submitted ? (await registerAction(submitted))?.error : undefined;

	return {
		register,
		errors: formState.errors,
		onSubmit,
		pending,
		email: submitted?.email,
		resend,
	};
}
