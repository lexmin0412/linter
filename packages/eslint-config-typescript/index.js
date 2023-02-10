module.exports = {
	extends: [
		'eslint:recommended',
		'@lexmin0412/vanilla',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'@typescript-eslint/no-unused-vars': ['error']
	}
};
