module.exports = {
	apps: [
		{
			name: 'AskNicelyEmployees',
			port: '4000',
			exec_mode: 'cluster',
			instances: '3',
			script: './.output/server/index.mjs'
		}
	]
}
