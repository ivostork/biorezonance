const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [    
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      minify: {
        collapseWhitespace: true
      },
      inject: false
    }),
    new ExtractTextPlugin('style.[hash].css'),
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
          {
            loader:'pug-loader'       
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
          }, 
          {
            loader: 'postcss-loader'
          }, 
          {
            loader: 'sass-loader',
            options: {
              sourcemap: false
            }
          }]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/,
        use: [
          {
            loader:'file-loader',
            options:{
              name:'[name].[hash].[ext]',
              publicPath:''
            }
          }
        ],
      }
    ]
  }
});

