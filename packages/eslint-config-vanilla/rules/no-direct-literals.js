/**
 * @fileoverview Rule to flag direct use of string/number literals in comparisons or array declarations.
 */

'use strict';

const { AST_NODE_TYPES, OPERATORS } = require('@lexmin0412/linter-shared');

module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Disallow direct use of string/number literals in comparisons or array declarations',
			recommended: false,
		},
		schema: [
			// 定义一个参数，用于忽略类似 eslintrc.js 这样的配置文件
			{
				type: 'object',
				properties: {
					ignoreFiles: {
						type: 'array',
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			noDirectLiteral4Binary: 'Avoid using direct literals in BinaryExpression. Consider defining a constant instead.',
			noDirectLiteral4Array: 'Avoid using direct literals in ArrayExpression. Consider defining a constant instead.',
		},
	},
	create(context) {
		return {
			Literal(node) {

				const ignoreFiles = context.options[0]?.ignoreFiles || []
				// 忽略配置文件
				if (ignoreFiles.some((file)=> context.getFilename().endsWith(file))) {
					return
				}

				const parent = node.parent
				console.log('parent.type', parent.type)
				// 检查是否在比较表达式中
				if (parent && parent.type === AST_NODE_TYPES.BINARY && [OPERATORS.EQUAL, OPERATORS.STRICT_EQUAL, OPERATORS.NOT_EQUAL, OPERATORS.STRICT_NOT_EQUAL, OPERATORS.LESS_THAN, OPERATORS.LESS_THAN_OR_EQUAL, OPERATORS.GREATER_THAN, OPERATORS.GREATER_THAN_OR_EQUAL].includes(parent.operator)) {
					context.report({
						node,
						messageId: 'noDirectLiteral4Binary',
					})
				}
				/**
				 * 检查是否在数组表达式中
				 */
				if (parent.type === AST_NODE_TYPES.ARRAY) {
					context.report({
						node,
						messageId: 'noDirectLiteral4Array',
					})
				}
			},
		};
	},
};
