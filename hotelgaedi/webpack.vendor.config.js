var webpack = require('webpack');
const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    vendor: ['bootstrap', 'jquery'],
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.join(__dirname, 'dist/'),
    library: 'vendor_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: path.join(__dirname, 'dist/', 'vendor-manifest.json'),
      context: path.resolve(__dirname, 'src'),
      entryOnly: true,
    }),
  ],
};
