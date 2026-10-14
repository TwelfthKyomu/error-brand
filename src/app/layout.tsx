import type { Metadata } from "next";
import { Alumni_Sans, Dela_Gothic_One, Onest } from "next/font/google";
import type { ReactNode } from "react";

import Footer from "@/app/layout/Footer";
import Header from "@/app/layout/Header";

import "@/styles/_module.scss";

const display = Dela_Gothic_One({
	weight: "400",
	subsets: ["latin", "cyrillic"],
	variable: "--font-display",
	display: "swap",
});

const poster = Alumni_Sans({
	subsets: ["latin", "cyrillic"],
	variable: "--font-poster",
	display: "swap",
});

const body = Onest({
	subsets: ["latin", "cyrillic"],
	variable: "--font-body",
	display: "swap",
});

export const metadata: Metadata = {
	title: "ERROR — уличная одежда",
	description:
		"Вещи ERROR висят на стене как отрывные объявления: оторвал купон — вещь в корзине.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html
			lang="ru"
			data-scroll-behavior="smooth"
			className={`${display.variable} ${poster.variable} ${body.variable}`}
		>
			<body>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
