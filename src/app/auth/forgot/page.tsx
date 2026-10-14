import { AuthCard } from "../AuthCard";

import { ForgotForm } from "./ForgotForm";

export const metadata = {
	title: "Новый пароль",
};

export default function ForgotPage() {
	return (
		<AuthCard
			title="Новый пароль"
			description="Пришлём код на почту, с ним можно задать новый пароль."
		>
			<ForgotForm />
		</AuthCard>
	);
}
