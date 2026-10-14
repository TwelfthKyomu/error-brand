import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	reactCompiler: true,
	cacheComponents: true,
	partialPrefetching: true,
	sassOptions: {
		includePaths: ["@/style"],
		additionalData: `@use "styles/abstract" as *;`,
	},
};

export default nextConfig;
