import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import unicornPlugin from "eslint-plugin-unicorn";

export default [
	{ ignores: [".next/**", "node_modules/**", "next-env.d.ts", "eslint.config.mjs"] },
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			react: reactPlugin,
			"jsx-a11y": jsxA11yPlugin,
			import: importPlugin,
			unicorn: unicornPlugin,
			"@next/next": nextPlugin,
		},
		rules: {
			"no-console": ["error", { allow: ["warn", "error"] }],
			"no-debugger": "error",
			"no-unused-vars": "off",
			curly: ["error", "multi-line", "consistent"],
			eqeqeq: ["error", "always"],

			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/ban-ts-comment": "warn",
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"object-curly-spacing": ["error", "always"],

			"react/jsx-key": "error",
			"react/jsx-no-target-blank": "error",
			"react/react-in-jsx-scope": "off",
			"react/self-closing-comp": ["error", { component: true, html: true }],
			"react/jsx-curly-brace-presence": ["error", "never"],
			"react/jsx-curly-spacing": "off",

			"import/order": [
				"error",
				{
					groups: [
						"builtin",
						"external",
						"internal",
						"parent",
						"sibling",
						"index",
					],
					"newlines-between": "always",
					alphabetize: { order: "asc", caseInsensitive: true },
				},
			],

			"jsx-a11y/anchor-is-valid": [
				"error",
				{
					components: ["Link"],
					specialLink: ["hrefLeft", "hrefRight"],
					aspects: ["invalidHref", "preferButton"],
				},
			],

			"unicorn/filename-case": [
				"error",
				{
					cases: {
						camelCase: true,
						pascalCase: true,
						kebabCase: true,
					},
				},
			],

			"@next/next/no-img-element": "warn",
			"@next/next/no-html-link-for-pages": "error",
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				project: "./tsconfig.json",
			},
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
];
