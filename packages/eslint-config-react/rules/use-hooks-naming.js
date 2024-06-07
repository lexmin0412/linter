const { AST_NODE_TYPES, NODE_NAMES } = require("@lexmin0412/linter-shared");


module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Enforce custom Hooks to be use react internal hooks',
			recommended: false,
			url: 'https://reactjs.org/docs/hooks-custom.html#naming-conventions'
		},
		fixable: 'none', // or "none" if the rule cannot be automatically fixed
		schema: [], // no options needed for this rule
		messages: {
			noReactInFunction: 'Custom Hooks should contains React API, instead rename it without "use" prefix.'
		}
	},
	create(context) {

		function checkReactFeatures(node, reportNode) {
			const { body } = node
			let hasReactFeatures = false
			if (body.type === AST_NODE_TYPES.BlockStatement) {
				body.body.forEach((statement) => {
					if (statement.type === AST_NODE_TYPES.VariableDeclaration) {
						statement.declarations.forEach((declaration) => {
							if (declaration.init && isReactReference(declaration.init)) {
								hasReactFeatures = true
							}
						});
					} else if (isReactReference(statement)) {
						hasReactFeatures = true
					}
				});
			} else {
				// Handle concise bodies (e.g., arrow functions without braces)
				if (isReactReference(body)) {
					hasReactFeatures = true
				}
			}
			if (!hasReactFeatures) {
				context.report({
					node: reportNode,
					messageId: 'noReactInFunction',
				});
			}
		}

		function isReactReference(node) {
			// 标识符
			if (node.type === AST_NODE_TYPES.Identifier && node.name === NODE_NAMES.react) {
				return true;
			}
			// 属性
			if (node.type === AST_NODE_TYPES.MemberExpression) {
				return node.object.name === NODE_NAMES.react || isReactReference(node.object);
			}
			// 函数调用
			if (node.type === AST_NODE_TYPES.CallExpression) {
				return isReactReference(node.callee);
			}
			// Add more checks for other node types as needed
			return false;
		}

		return {
			FunctionDeclaration(node) {
				if (node.id) {
					if (node.id.name.startsWith('use')) {
						// 检查当前节点（函数体），但报错需要报到函数声明上
						checkReactFeatures(node, node.id)
					}
				}
			},
			ArrowFunctionExpression(node) {
				// console.log('ArrowFunctionExpression')
				// 检查赋值的变量名是否以 use 开头
				if (node.parent) {
					if (node.parent.type === AST_NODE_TYPES.VariableDeclarator) {
						const id = node.parent.id
						if (id && id.type === AST_NODE_TYPES.Identifier && id.name.startsWith('use')) {
							// 检查当前节点（函数体），但报错需要报到箭头函数变量声明上
							checkReactFeatures(node, node.parent.id);
						}
					}
				}
			},
		};
	}
};
