import { AuthCard } from "../AuthCard";

import { RegisterForm } from "./RegisterForm";

export const metadata = {
	title: "Регистрация",
};

export default function RegisterPage() {
	return (
		<AuthCard
			title="Регистрация"
			description="Заказы будут собираться в кабинете. Почту подтвердим кодом из письма."
		>
			<RegisterForm />
		</AuthCard>
	);
}
