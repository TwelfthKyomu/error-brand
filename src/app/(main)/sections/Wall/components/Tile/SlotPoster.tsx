import { brandFallback } from "../../lib/template";
import { BrandPoster } from "../BrandPoster";
import { CluePoster } from "../CluePoster";
import { EditionPoster } from "../EditionPoster";
import { Flyer } from "../Flyer";
import { HowtoPoster } from "../HowtoPoster";
import { NavPoster } from "../NavPoster";
import { Scrap } from "../Scrap";
import { Sticker } from "../Sticker";
import { Tag } from "../Tag";

import type { SlotPosterProps } from "./Tile.type";

export const SlotPoster = ({
	slot,
	order,
	product,
	edition,
	total,
	hasSecret,
	found,
	actions,
}: SlotPosterProps) => {
	switch (slot.kind) {
		case "flyer":
			return product ? (
				<Flyer
					product={product}
					slot={slot}
					order={order}
					actions={actions}
				/>
			) : (
				<BrandPoster slot={brandFallback(slot)} order={order} />
			);
		case "edition":
			return edition ? (
				<EditionPoster
					slot={slot}
					order={order}
					product={edition}
					onOpen={actions.onOpen}
				/>
			) : (
				<BrandPoster slot={brandFallback(slot)} order={order} />
			);
		case "clue":
			return hasSecret ? (
				<CluePoster slot={slot} order={order} found={found} />
			) : (
				<BrandPoster slot={brandFallback(slot)} order={order} />
			);
		case "brand":
			return <BrandPoster slot={slot} order={order} />;
		case "nav":
			return <NavPoster slot={slot} order={order} total={total} />;
		case "howto":
			return <HowtoPoster slot={slot} order={order} />;
		case "sticker":
			return <Sticker slot={slot} order={order} />;
		case "tag":
			return <Tag slot={slot} order={order} />;
		case "scrap":
			return <Scrap slot={slot} order={order} />;
	}
};
