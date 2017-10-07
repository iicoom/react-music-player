'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	 entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/index.js')
    ],
	devtool: 'eval-source-map',
	// devServer: {
	//     contentBase: './dist',
	//     compress: true,
	//     port: 3001
	// },
	output: {
		filename: 'bundle.js',
    	path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
          template: './app/index.tpl.html',
          inject: 'body',
          filename: './index.html'
        }),
		new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
	],
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