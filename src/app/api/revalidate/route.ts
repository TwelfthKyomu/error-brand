import { createHash, timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";

import { CATALOG_TAG } from "@/shared/lib/admin-api";
import { getAdminApiConfig } from "@/shared/lib/admin-api/config";

const SIGNATURE_HEADER = "x-storefront-signature";

export function POST(request: Request) {
	const expected = Buffer.from(
		createHash("sha256").update(getAdminApiConfig().apiKey).digest("hex")
	);
	const actual = Buffer.from(request.headers.get(SIGNATURE_HEADER) ?? "");

	if (
		expected.length !== actual.length ||
		!timingSafeEqual(expected, actual)
	) {
		return new Response(null, { status: 401 });
	}

	revalidateTag(CATALOG_TAG, { expire: 0 });

	return new Response(null, { status: 204 });
}
