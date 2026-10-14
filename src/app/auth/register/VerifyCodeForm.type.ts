export type VerifyCodeFormValues = {
	code: string;
};

export type VerifyCodeFormProps = {
	email: string;
	onResend: () => Promise<string | undefined>;
};
