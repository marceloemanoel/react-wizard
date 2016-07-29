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
    library: 'react-wizard',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
    },
    {
      'react-addons-css-transition-group': {
        root: 'ReactCSSTransitionGroup',
        commonjs: 'react-addons-css-transition-group',
        commonjs2: 'react-addons-css-transition-group',
        amd: 'react-addons-css-transition-group'
      }
    }
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('[name].min.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin({minimize: false })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract("css-loader", ["css","sass"])}
    ]
  }
};
