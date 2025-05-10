/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	root: true,

	env: {
		browser: true,
		es6: true,
		node: true,
	},

	parser: '@typescript-eslint/parser',

	parserOptions: {
		project: ['./tsconfig.json'],
		sourceType: 'module',
		extraFileExtensions: ['.json'],
	},

	ignorePatterns: ['.eslintrc.js', '**/*.js', '**/node_modules/**', '**/dist/**'],

	overrides: [
		{
			files: ['package.json'],
			plugins: ['eslint-plugin-n8n-nodes-json-to-mp4'],
			extends: ['plugin:n8n-nodes-json-to-mp4/community'],
			rules: {
				'n8n-nodes-json-to-mp4/community-package-json-name-still-default': 'off',
			},
		},
		{
			files: ['./credentials/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-json-to-mp4'],
			extends: ['plugin:n8n-nodes-json-to-mp4/credentials'],
			rules: {
				'n8n-nodes-json-to-mp4/cred-class-field-documentation-url-missing': 'off',
				'n8n-nodes-json-to-mp4/cred-class-field-documentation-url-miscased': 'off',
			},
		},
		{
			files: ['./nodes/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-json-to-mp4'],
			extends: ['plugin:n8n-nodes-json-to-mp4/nodes'],
			rules: {
				'n8n-nodes-json-to-mp4/node-execute-block-missing-continue-on-fail': 'off',
				'n8n-nodes-json-to-mp4/node-resource-description-filename-against-convention': 'off',
				'n8n-nodes-json-to-mp4/node-param-fixed-collection-type-unsorted-items': 'off',
			},
		},
	],
};
