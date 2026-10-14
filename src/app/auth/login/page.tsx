import { AuthCard } from "../AuthCard";

import { LoginForm } from "./LoginForm";

export const metadata = {
	title: "Вход",
};

export default function LoginPage() {
	return (
		<AuthCard title="Вход" description="Заказы и история покупок.">
			<LoginForm />
		</AuthCard>
	);
}
