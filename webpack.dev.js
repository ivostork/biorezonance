const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  entry: {
    app: './src/index.js',
    pugreload:'./src/index.pug'
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      inject: false
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    //contentBase: path.resolve(__dirname, './src/content/img'),
    port: 9000,
    hot: true,
    compress:true,
    host:"0.0.0.0"
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader', 
          { loader: 'postcss-loader', options: { sourceMap: true }},
          { loader: "sass-loader", options: { sourceMap: true }}
        ]
      }
    ]
  }
});
