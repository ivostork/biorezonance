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
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
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
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    hot: true,
    compress:true,
    host:"0.0.0.0"
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [      
          {
            loader:'pug-loader'       
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader', 
          { loader: 'postcss-loader', options: { sourceMap: true }},
          { loader: "sass-loader", options: { sourceMap: true }}
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,        
        use: [
          {       
            loader:'file-loader',
            options:{
              name:'[name].[hash].[ext]',
              publicPath:''
            }
          }
        ]
      }
    ]
  }
});
