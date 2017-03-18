module.exports = {
	entry: "./client/Idlewild.js",
	output: {
		path: '/',
		filename: "packed.js"
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react'],
					plugins: ['transform-class-properties']
				}
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader!sass-loader"
			},
			{
				test: /(README\.md|CHANGELOG|package\.json)$/,
				loader: "ignore-loader"
			}
		]
	},
	devtool: "eval-source-map"
};