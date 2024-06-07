const { AST_NODE_TYPES, OPERATORS, VALUE_TYPES, JSX_ELEMENT_NAMES, NUMBERS } = require("../shared/constants")

const PROP_NAME = 'maxLength'

module.exports = {
	meta: {
		docs: {
			description: 'Ensure Input elements have a maxLength prop.',
			category: 'Best Practices',
			recommended: true,
			url: 'https://eslint.org',
		},
		schema: [],
	},

	create: function (context) {
		// 创建一个规则监听器，当 JSX 开标签被遍历时触发
		return {
			// 校验 Input 标签必须包含 maxLength 属性
			JSXOpeningElement: function (node) {
				// 检查是否是 Input 组件
				if (node.name.name === JSX_ELEMENT_NAMES.Input) {
					// 遍历所有属性，检查是否有 maxLength
					const hasMaxLength = node.attributes.some(attr => {
						return attr.type === AST_NODE_TYPES.JSXAttribute && attr.name.name === PROP_NAME
					})

					// 如果没有 maxLength 属性，则报告错误
					if (!hasMaxLength) {
						context.report({
							node: node,
							message: 'Input elements must have a maxLength prop.',
						})
					}
				}
			},
			// 校验 Input 标签的 maxLength 属性必须大于 0
			JSXAttribute: function (node) {
				// 检查属性名称是否为 maxLength
				if (node.name.name === PROP_NAME) {
					// 假设属性值是一个字面量（例如：{value: 10}）
					if (node.value.type === AST_NODE_TYPES.Literal && typeof node.value.value === VALUE_TYPES.NUMBER) {
						// 检查 maxLength 的值是否小于 1
						if (node.value.value < NUMBERS.ONE) {
							context.report({
								node: node,
								message: 'maxLength prop must not be less than 1.',
							})
						}
					} else if (node.value.type === AST_NODE_TYPES.JSXExpressionContainer) {
						// 假设属性值是一个表达式（例如：{value: {maxLength}}）
						if (node.value.expression.type === AST_NODE_TYPES.UnaryExpression) {
							if (node.value.expression.operator === OPERATORS.MINUS && node.value.expression.argument.type === AST_NODE_TYPES.Literal && node.value.expression.argument.value > NUMBERS.ZERO) {
								context.report({
									node: node,
									message: 'maxLength prop must not be less than 0.',
								})
							}
						}
					}
				}
			},
		}
	},
}
