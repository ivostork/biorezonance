const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      minify: {
        collapseWhitespace: true
      },
      hash: true
    }),
    new MinifyPlugin(),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          {
            loader:'pug-html-loader',
            options: {
              data: {
                imgUrl: './content/img/'
              }
            }            
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 2
            }
          }, {
            loader: 'postcss-loader'
          }, {
            loader: 'sass-loader',
            options: {
              sourcemap: true
            }
          }]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {
            loader:'file-loader',
            options:{
              name:'img/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader'
          },
        ],
      }
    ]
  }
});

