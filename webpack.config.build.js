const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  mode: 'production',

  entry: path.resolve(__dirname, 'src', 'index.js'),

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'build')],
  },

  output: {
    filename: 'bundle.js',
    chunkFilename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },


  // optimization: {
  //   //   minimizer: [new UglifyJsPlugin()],
  //   //   namedModules: false,
  //   //   namedChunks: false,
  //   //   nodeEnv: 'production',
  //   //   flagIncludedChunks: true,
  //   //   occurrenceOrder: true,
  //   //   sideEffects: true,
  //   //   usedExports: true,
  //   //   concatenateModules: true,
  //   //   noEmitOnErrors: true,
  //   //   checkWasmTypes: true,
  //   //   minimize: true,
  //   // },

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
