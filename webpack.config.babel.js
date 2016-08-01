import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const isProduction = process.env.WEBPACK_ENV === 'production';
const libraryName = "react-wizard";
const moduleName = `${libraryName}${isProduction ? '.min' : ''}`;

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: './src/index',
  output: {
    path: __dirname + '/lib',
    publicPath: '/',
    filename: `${moduleName}.js`,
    library: libraryName,
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
    new ExtractTextPlugin(`${moduleName}.css`),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: false })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract("css-loader", ["css","sass"])}
    ]
  }
};
