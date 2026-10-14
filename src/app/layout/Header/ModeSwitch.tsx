"use client";

import { usePathname } from "next/navigation";

import { ModeLinks } from "./ModeLinks";
import { activeMode } from "./navigation";

export const ModeSwitch = () => (
	<ModeLinks active={activeMode(usePathname())} />
);
