const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(['dist'])    
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [      
      {
        test: /\.(woff|woff2)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  }
};
