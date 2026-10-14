type MarkProps = {
	className?: string;
};

export const Mark = ({ className }: MarkProps) => (
	<svg viewBox="0 0 32 32" className={className} aria-hidden="true">
		<rect width="32" height="32" rx="6" fill="#131313" />
		<rect x="6" y="5" width="20" height="12" fill="#ff4fae" />
		<rect x="6" y="18.5" width="4.25" height="8.5" fill="#ff4fae" />
		<rect x="11.25" y="18.5" width="4.25" height="8.5" fill="#ff4fae" />
		<rect x="16.5" y="18.5" width="4.25" height="1.6" fill="#ff4fae" />
		<rect x="21.75" y="18.5" width="4.25" height="8.5" fill="#ff4fae" />
	</svg>
);
