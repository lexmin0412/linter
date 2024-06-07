/**
 * 表达式
 */
const AST_NODE_TYPES = {
	/**
	 * 算术表达式
	 */
	BINARY: 'BinaryExpression',
	/**
	 * 数组表达式
	 */
	ARRAY: 'ArrayExpression',
	/**
	 * 函数调用表达式
	 */
	CALL: 'CallExpression',
	BlockStatement: 'BlockStatement',
	VariableDeclaration: 'VariableDeclaration',
	Identifier: 'Identifier',
	VariableDeclarator: 'VariableDeclarator',
	JSXExpressionContainer: 'JSXExpressionContainer',
	UnaryExpression: 'UnaryExpression',
	Literal: 'Literal',
	JSXAttribute: 'JSXAttribute'
}
/**
 * 运算符
 */
const OPERATORS = {
	PLUS: '+',
	MINUS: '-',
	MULTIPLY: '*',
	DIVIDE: '/',
	EQUAL: '==',
	STRICT_EQUAL: '===',
	NOT_EQUAL: '!=',
	STRICT_NOT_EQUAL: '!==',
	LESS_THAN: '<',
	GREATER_THAN: '>',
	LESS_THAN_OR_EQUAL: '<=',
	GREATER_THAN_OR_EQUAL: '>='
}
const VALUE_TYPES = {
	STRING: 'string',
	NUMBER: 'number'
}
/**
 * react 内置 hooks
 */
const REACT_INTERNAL_HOOKS = {
	useState: 'useState',
	useEffect: 'useEffect',
	useMemo: 'useMemo',
	useCallback: 'useCallback',
	useRef: 'useRef',
	useContext: 'useContext',
	useReducer: 'useReducer',
	useImperativeHandle: 'useImperativeHandle'
}
const NODE_NAMES = {
	react: 'React',
}
const JSX_ELEMENT_NAMES = {
	Input: 'Input',
}
const NUMBERS = {
	ZERO: 0,
	ONE: 1,
}

module.exports = {
	AST_NODE_TYPES,
	OPERATORS,
	REACT_INTERNAL_HOOKS,
	NODE_NAMES,
	VALUE_TYPES,
	JSX_ELEMENT_NAMES,
	NUMBERS
}
