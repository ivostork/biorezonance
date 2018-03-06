const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  entry: {
    app: './src/index.js',
    index:'./src/index.pug' //for pug reload
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
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
            loader:'html-loader',
            options: {
              attrs:['link:href','img:src', 'source:data-src1','source:data-src2']
            }
          },         
          {
            loader:'pug-html-loader',
            options: {
              data:{
                imgUrl:'./content/img/',
                imgUrl2:'./content/img/'
              }
            }        
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader', 
          'postcss-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,        
        use: [
          {       
            loader:'file-loader',
            options:{
              name:'./content/img/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
});
