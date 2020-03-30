const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/landingPage/index.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        }],
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/landingPage/index.html',
      filename: './index.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/canvas/app.html',
      filename: './app.html',
    }),
    new CopyPlugin([
      { from: 'src/images', to: './images' },
      { from: 'src/lib', to: './' },
    ]),
    new MiniCssExtractPlugin({
      filename: './[name.css',
    }),
  ],
};
