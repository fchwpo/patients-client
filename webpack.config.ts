const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const production = process.env.NODE_ENV == 'production';
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: "./src/components/index.tsx",
  mode: production ? 'production' : 'development',
	...(!production && { devtool: 'source-map' }),
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".scss", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
    ],
  },
  optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false
					}
				}
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      publicPath: "/"
    }),
    new MiniCssExtractPlugin({
      filename: `styles/${
        production ? '' : 'dev.'
      }[name].[contenthash:8].css`
    }),
  ],
};