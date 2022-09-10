const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');

const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
};

const modeConfig =
  process.env.NODE_ENV === 'production'
    ? require('./webpack.prod')
    : require('./webpack.dev');

module.exports = merge(
  {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
      site: './src/js/site.js',
      //admin: './src/js/admin.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/'),
      library: '[name]_dll',
    },
    module: {
      rules: [
        {
          test: /\.js$/, // scripts
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new PurgeCSSPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        only: ['scss'],
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        name: '[name]_dll',
        manifest: path.join(__dirname, 'dist/', 'vendor-manifest.json'),
      }),
    ],
  },
  modeConfig
);
