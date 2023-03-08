const path = require('node:path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

const sourceDir = path.join(__dirname, '..', 'src');

module.exports = {
  entry: {
    popup: path.join(sourceDir, 'popup.tsx'),
    options: path.join(sourceDir, 'options.tsx'),
    background: path.join(sourceDir, 'background.ts'),
    content_script: path.join(sourceDir, 'content_script.tsx'),
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'swc-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: { minimize: true },
      },
      {
        test: /\.scss/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/js'),
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../templates'),
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL || ''),
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
