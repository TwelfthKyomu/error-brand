import type { Ref } from "react";

import type { FlyerActions } from "../../Wall.type";

export type SecretProps = {
	actions: FlyerActions;
	onFound: (announce: boolean) => void;
	onEmpty: () => void;
};

export type CoverProps = {
	ref: Ref<HTMLDivElement>;
	wiggle: boolean;
	onTear: () => void;
};
