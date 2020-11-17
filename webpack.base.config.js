'use strict';

const webpack = require('webpack');
const path = require('path');
const appSrc = path.resolve(__dirname, './src');
const appResources = path.resolve(__dirname, './resources');

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const resolve = {
  extensions: [".js", ".jsx", ".ts", ".tsx", '.json'],
  plugins: [
    new TsconfigPathsPlugin({
      configFile: "./tsconfig.json"
    })
  ]
};

module.exports = {
  mode: 'development',
  resolve,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_RESOURCES': JSON.stringify(appResources)
    })
  ]
};
