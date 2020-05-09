const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname) + '/build/built.js',
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'build')],
  },
  output: {
    filename: 'bundle.js',
    chunkFilename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'babel'),
        exclude: /node_modules/,
      },
    ],
  },
};
