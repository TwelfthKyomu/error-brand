import { ButtonLink, WallNotice } from "@/shared/ui";

export default function NotFound() {
	return (
		<WallNotice
			code="404"
			title="Листовку сорвали"
			text="Такой страницы нет: её сняли со стены или в адресе опечатка."
		>
			<ButtonLink href="/">На стену</ButtonLink>
			<ButtonLink href="/collections" variant="outline">
				Списком
			</ButtonLink>
		</WallNotice>
	);
}
