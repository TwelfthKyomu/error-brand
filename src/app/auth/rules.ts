import {
	EMAIL_PATTERN,
	PASSWORD_MAX,
	PASSWORD_MIN,
} from "@/shared/lib/validation";

export const EMAIL_RULES = {
	required: "Введите email",
	pattern: { value: EMAIL_PATTERN, message: "Неверный email" },
};

export const PASSWORD_RULES = {
	required: "Введите пароль",
	minLength: {
		value: PASSWORD_MIN,
		message: `Минимум ${PASSWORD_MIN} символов`,
	},
	maxLength: { value: PASSWORD_MAX, message: "Слишком длинный пароль" },
};

export const FIRST_NAME_RULES = {
	required: "Введите имя",
	maxLength: { value: 100, message: "Слишком длинное имя" },
};

export const LAST_NAME_RULES = {
	maxLength: { value: 100, message: "Слишком длинная фамилия" },
};

export const CODE_RULES = {
	required: "Введите код",
	pattern: { value: /^\d{6}$/, message: "Код — 6 цифр" },
};
