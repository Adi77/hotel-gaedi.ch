const webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {
    publicPath: 'http://hotel-gaedi.ch.local:8080/',
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  cache: true,
  experiments: {
    lazyCompilation: true,
  },
  devtool: 'eval-cheap-source-map',
  devServer: {
    port: 8080,
    host: '0.0.0.0', // this lets the server listen for requests from the lan network, not just localhost.
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    static: {
      directory: path.resolve(process.cwd(), 'dist'),
    },
    compress: false,
    hot: true,
    allowedHosts: 'all',
  },
  performance: {
    hints: false,
  },
  output: {
    pathinfo: false,
  },
  optimization: {
    //runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  //plugins: [new webpack.HotModuleReplacementPlugin()],
};
