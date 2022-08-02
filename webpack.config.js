const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/index.ts'
  },
  module: {
    rules: [
      { test: /\.ts(x?)$/,
        use: 'ts-loader'
      }
    ]
  },
  externals : {
    validatorjs: 'validatorjs',
    react: 'react'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ]
  },
  output: {
    filename: "[name].js",
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
