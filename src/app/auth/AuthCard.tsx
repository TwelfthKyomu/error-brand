import type { ReactNode } from "react";

import styles from "./Auth.module.scss";

type AuthCardProps = {
	title: string;
	description: string;
	children: ReactNode;
};

export const AuthCard = ({ title, description, children }: AuthCardProps) => (
	<div className={styles.card}>
		<h1 className={styles.title}>{title}</h1>
		<p className={styles.description}>{description}</p>
		{children}
	</div>
);
