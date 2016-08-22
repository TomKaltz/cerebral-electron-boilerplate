var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: [
		// Set up an ES6-ish environment
		//'babel-polyfill',

		// Add your application's scripts below
		path.resolve(__dirname, 'app/main.js')
	],
	target: "electron",
	output: {
		path: path.resolve(__dirname, 'out'),
		publicPath: 'out/',
		filename: 'compiledapp.js'
	},
	devtool: 'cheap-module-eval-source-map',
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				plugins: ['transform-decorators-legacy'],
				presets: ['es2015', 'stage-0', 'react']
			}
		}, {
			test: /\.gcss$/,
			loader: 'style?singleton!css!postcss'
		}, {
			test: /\.css$/,
			loader: 'style?singleton!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss'
		}, {
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/octet-stream'
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file'
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=image/svg+xml'
		}, {
			test: /\.png$/,
			loader: "url-loader?limit=100000"
		}]
	},
  postcss: function () {
    return [autoprefixer];
  },
	// plugins: [
	// 	new ExtractTextPlugin("style.css", {
	// 		allChunks: true
	// 	})
	// ]
};
