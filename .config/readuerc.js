/**
 * Readue 配置文件
 * @type {import('@readue/config').ReadueConfig}
 */
module.exports = {
	mode: 'insert',
	outputFile: './../README.md',
	blocks: {
		type: 'custom', list: [
			'@readue/block-base_info',
			"@readue/block-packages",
			"@readue/block-tree",
			"@readue/block-star_history",
		]
	},
	insertPlaceholder: '__READUE_PLACEHOLDER__',
	templateFile: './template.md',
}
