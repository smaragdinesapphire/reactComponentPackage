const path = require('path');

const entryJS = `${path.resolve(__dirname, 'src')}/index.jsx`;
const outputPath = path.resolve(__dirname, 'MyModule');
const filename = 'myModule.js';
const library = 'myModule';
const libraryTarget = 'var';
const sourceMap = 'cheap-module-eval-source-map';

module.exports = {
  mode: 'development',
  devtool: sourceMap,
  entry: ['@babel/polyfill', entryJS],
  output: {
    path: outputPath,
    filename,
    library,
    libraryTarget,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
