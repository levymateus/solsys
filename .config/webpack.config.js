'use strict'

const path = require('path');
const webpack = require('webpack');

require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

process.env.BABEL_ENV = 'development';

const paths = require('./paths');
const createDevServer = require('./webpackDevServer.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';
	const devServer = createDevServer()

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
		entry: paths.appIndexJs,

    plugins: [
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        title: 'My App',
        template: paths.appHtml,
      }),
    ],

    output: {
      path: paths.appBuild,
      publicPath: path.appHtml,
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [path.resolve(__dirname, 'src')],
          loader: 'babel-loader',
        },
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /.css$/,

          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    devServer: devServer,
  }
};
