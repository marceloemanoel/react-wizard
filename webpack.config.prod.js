import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify("production")
};

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: [
    './src/index',
    './src/stylesheets/wizard.scss'
  ],
  output: {
    path: __dirname + '/lib',
    publicPath: '/',
    filename: 'react-wizard.min.js',
    library: 'react_wizard',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('[name].min.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract("css-loader", ["css","sass"])}
    ]
  }
};
