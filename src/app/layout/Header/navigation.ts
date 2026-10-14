export const NAV_ITEMS = [
	{ href: "/looks", label: "Образы" },
	{ href: "/account", label: "Кабинет" },
];

export const MENU_ITEMS = [
	{ href: "/", label: "Стена" },
	{ href: "/collections", label: "Все вещи" },
	{ href: "/looks", label: "Образы" },
	{ href: "/about", label: "О бренде" },
	{ href: "/account", label: "Кабинет" },
];

export const MODES = [
	{ href: "/", label: "Стена" },
	{ href: "/collections", label: "Список" },
];

export function activeMode(pathname: string): string | undefined {
	if (pathname === "/") return "/";
	if (pathname.startsWith("/collections")) return "/collections";

	return undefined;
}
