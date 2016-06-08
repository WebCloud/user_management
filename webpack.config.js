const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  `sass-loader?includePaths[]=${path.resolve(__dirname, './src/styles')}`
];

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: './public/js',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: [
            'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },
  devtool: '#source-map',
  plugins: [
    new ExtractTextPlugin('../css/bundle.css'),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  postcss() {
    return [require('autoprefixer')];
  }
};
