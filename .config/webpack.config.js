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
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';
	const devServer = createDevServer()

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
		entry: paths.appIndexJs,

    devtool: isEnvDevelopment ? 'source-map' : undefined,

    plugins: [
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        title: 'My App',
        template: paths.appHtml,
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, '../static') }
        ]
      }),
    ],

    output: {
      path: paths.appBuild,
      publicPath: path.appHtml,
    },

    module: {
      rules: [

        // Javascript
        {
          test: /\.(js|jsx)$/,
          include: [path.resolve(__dirname, 'src')],
          loader: 'babel-loader',
        },

        // Typescript
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },

        // CSS
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

        // Images
        {
          test: /\.(jpg|png|gif|svg)$/,
          use:
          [
            {
              loader: 'file-loader',
              options:
              {
                  outputPath: 'assets/images/'
              }
            }
          ]
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    devServer: devServer,

    stats: {
      preset: "errors-only",
    }
  }
};
