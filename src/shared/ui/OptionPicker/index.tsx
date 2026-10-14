import styles from "./OptionPicker.module.scss";
import type { OptionPickerProps } from "./OptionPicker.type";

export const OptionPicker = ({
	options,
	selection,
	onSelect,
}: OptionPickerProps) =>
	options.map(option => (
		<div
			key={option.name}
			className={styles.option}
			role="group"
			aria-label={option.name}
		>
			<span className={styles.name}>{option.name}</span>
			<div className={styles.values}>
				{option.values.map(value => (
					<button
						key={value}
						type="button"
						className={styles.value}
						aria-pressed={selection[option.name] === value}
						onClick={() => onSelect(option.name, value)}
					>
						{value}
					</button>
				))}
			</div>
		</div>
	));
