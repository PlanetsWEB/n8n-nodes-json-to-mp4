/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: "./.eslintrc.js",

	overrides: [
		{
			files: ['package.json'],
			plugins: ['eslint-plugin-n8n-nodes-json-to-mp4'],
			rules: {
				'n8n-nodes-json-to-mp4/community-package-json-name-still-default': 'error',
			},
		},
	],
};
