const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const typesToUse = [
  { from: 'node_modules/@types/lodash', to: 'lodash' },
];

module.exports = {
	mode: 'development',
	entry: {
		app: './src/index.ts',
		'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
		'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
		'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
		'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
		'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ttf$/,
				use: ['file-loader']
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			title: 'Monaco Editor Sample'
		}),
    new CopyPlugin({
      patterns: typesToUse,
    }),
    new ManifestPlugin.WebpackManifestPlugin({
      fileName: 'dts-files.json',
      generate: (seed, files) => {
        return files.filter(file => file.name.endsWith('.d.ts')).map(file => file.name);
      }
    })
	]
};
