const path 		= require('path')
const webpack	= require('webpack')



const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
})


module.exports = {
	devtool: 'source-map',
	entry: './src/index',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'assets/bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
		],
	},
	plugins: [HtmlWebpackPluginConfig]
}