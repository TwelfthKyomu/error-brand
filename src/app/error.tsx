"use client";

import { Button, ButtonLink, WallNotice } from "@/shared/ui";

export default function Error({ reset }: { reset: () => void }) {
	return (
		<WallNotice
			code="ERR"
			title="Листовку сдуло"
			text="Что-то сломалось на нашей стороне. Попробуй ещё раз — обычно помогает."
		>
			<Button onClick={reset}>Повесить заново</Button>
			<ButtonLink href="/" variant="outline">
				На стену
			</ButtonLink>
		</WallNotice>
	);
}
