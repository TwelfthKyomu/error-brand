import type { ReactNode } from "react";
import { Suspense } from "react";

import styles from "./Auth.module.scss";
import { RedirectIfSignedIn } from "./RedirectIfSignedIn";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<section className={styles.wall}>
			<Suspense>
				<RedirectIfSignedIn />
			</Suspense>
			{children}
		</section>
	);
}
