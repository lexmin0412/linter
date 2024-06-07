const path = require('path')

module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow imports from business modules in shared modules.',
			category: 'Possible Errors',
			recommended: true,
			url: 'https://github.com',
		},
		schema: [
			{
				type: 'object',
				properties: {
					sharedModules: {
						type: 'array',
						items: { type: 'string' },
						minItems: 1,
						uniqueItems: true,
					},
					businessModules: {
						type: 'array',
						items: { type: 'string' },
						minItems: 1,
						uniqueItems: true,
					},
				},
				additionalProperties: false,
			},
		],
	},

	create: function (context) {
		const options = context.options[0] || {}
		const sharedModules = options.sharedModules || ['components', 'constants', 'hooks', 'store', 'types', 'utils']
		const businessModules = options.businessModules || ['pages', 'views']

		return {
			ImportDeclaration(node) {
				const sourcePath = path.join(node.source.value)
				const filePath = context.getFilename()
				const relativePath = path.relative(context.getCwd(), filePath)

				const isCurrentFileInSharedModules = sharedModules.some(sharedModuleName =>
					relativePath.startsWith(path.join('src', sharedModuleName)),
				)

				// If the current file is not in shared modules, skip further checks
				if (!isCurrentFileInSharedModules) {
					return
				}
				// Check if importing from page modules
				const isImportFromBusinessModules = businessModules.some(pageModuleName => {
					return sourcePath.startsWith(path.join('src', pageModuleName))
				})

				// Report an error if importing from page modules
				if (isImportFromBusinessModules) {
					context.report({
						node: node.source,
						message: `Importing from business modules is not allowed in shared modules. Consider importing from a shared module instead.`,
					})
				}
			},
		}
	},
}
