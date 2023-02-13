import type { UserConfig } from '@commitlint/types'

const configuration: UserConfig = {
	extends: ['@lexmin0412/commitlint-plugin-standard'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'chore', // 项目基础架构相关 如依赖/构建流程改造等
				'test', // 测试代码
				'feat', // 新增内容
				'fix', // 修复bug
				'refactor', // 代码重构（不改变外部行为）
				'style', // 代码格式化
				'docs', // 文档更新
				'conf', // 项目配置文件的更改(如.eslintrc的修改)
				'revert', // 回退
				'optimize', // 优化（代码或性能优化）
				'build', // 项目打包相关(如build文件夹下编译插件的修改)
			],
		],
		'type-case': [0],
		'type-empty': [0],
		'scope-empty': [0],
		'scope-case': [0],
		'header-max-length': [0, 'always', 72],
	},
}

module.exports = configuration
