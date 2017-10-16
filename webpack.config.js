const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './app/index.js'
	},
	devtool: 'inline-source-map',
	devServer: {
	    contentBase: './dist',
	    compress: true,
	    port: 3000
	},
	plugins: [
		new HtmlWebpackPlugin({
          template: './app/index.tpl.html',
          inject: 'body',
          filename: './index.html'
        })
	],
	output: {
		filename: 'bundle.js',
    	path: path.resolve(__dirname, 'dist')
	},
	module: {
		resolve:{
			extensions:['','.js','.json']
		},
		loaders:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
                loader: "babel-loader",
                query:
                {
                  presets:['react','es2015']
                }
			},
			{
				test: /\.css$/,
				loader: "style!css"
			},
			{
				test: /\.less/,
				loader: 'style-loader!css-loader!less-loader'
			}
		]
	}
}