import type Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLook = {
	variant?: "primary" | "signal" | "outline";
	size?: "medium" | "large";
};

export type ButtonProps = ComponentProps<"button"> & ButtonLook;

export type ButtonLinkProps = ComponentProps<typeof Link> & ButtonLook;
