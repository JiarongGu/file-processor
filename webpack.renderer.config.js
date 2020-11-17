const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const baseConfig = require('./webpack.base.config');

const appSrc = path.resolve(__dirname, './src');
const appPublic = path.resolve(__dirname, './public');
const appOutput = path.resolve(__dirname, './dist');

const sassRegex = /\.s[ac]ss$/i;


module.exports = merge.smart(baseConfig, {
  target: 'electron-renderer',
  context: `${appSrc}/renderer`,
  entry: {
    app: ['@babel/polyfill', './index.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: sassRegex,
        use: [
          'css-hot-loader',
          { 
            loader: 'style-loader', 
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            } 
          },
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCaseOnly',
                namedExport: true
              },
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                includePaths: ['./src/styles'],
              },
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true
            }
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.resolve(process.cwd(), 'node_modules'),
          name: 'vendor',
          enforce: true,
          priority: 10
        },
        utils: {
          test: /\.js$/,
          chunks: 'initial',
          name: 'common',
          minSize: 0
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(appPublic, 'index.html'),
      minify: false
    }),
    new CopyWebpackPlugin({ 
      patterns: [
        { from: appPublic, to: appOutput, globOptions: { ignore: ['index.html'] } }
      ]}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
});
