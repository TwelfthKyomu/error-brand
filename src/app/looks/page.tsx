import styles from "./Looks.module.scss";
import LookSpread from "./sections/LookSpread";

import { loadLooks } from "@/shared/lib/admin-api";
import { EmptyState, PageHeader } from "@/shared/ui";

export const metadata = {
	title: "Образы — ERROR",
	description:
		"Готовые комплекты ERROR: отмеченные на фото вещи можно взять целиком.",
};

export default async function LooksPage() {
	const looks = await loadLooks();

	return (
		<div className={styles.page}>
			<PageHeader
				title="Образы"
				aside="Комплекты, которые мы собрали сами. Наведи на номер — подсветим вещь, или возьми образ целиком."
			/>

			{looks.length === 0 ? (
				<EmptyState
					title="Образов пока нет"
					description="Скоро повесим. Пока загляни на стену."
				/>
			) : (
				looks.map((look, index) => (
					<LookSpread key={look.id} look={look} index={index} />
				))
			)}
		</div>
	);
}
