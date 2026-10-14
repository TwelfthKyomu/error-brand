"use client";

import { useState, type ImgHTMLAttributes } from "react";

import styles from "./Image.module.scss";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
	src: string;
	alt: string;
};

export const Image = ({
	loading = "lazy",
	decoding = "async",
	className,
	onLoad,
	...props
}: ImageProps) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<span className={styles.wrapper} data-loaded={loaded}>
			<img
				loading={loading}
				decoding={decoding}
				className={className}
				onLoad={(event) => {
					setLoaded(true);
					onLoad?.(event);
				}}
				{...props}
			/>
		</span>
	);
};
