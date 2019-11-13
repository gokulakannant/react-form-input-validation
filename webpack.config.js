const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      { test: /\.ts(x?)$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  target:"web",
  optimization: {
    minimizer: [new UglifyJsPlugin({
        cache: true,
        uglifyOptions: {
            output: {
              comments: false,
            },
        },
    })],
  },
  mode: "production"
};
