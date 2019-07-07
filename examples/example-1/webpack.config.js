const webpack = require('webpack')

// path
const path = require('path')
function thePath(folder = '') { return path.resolve(__dirname, folder) }
const assets = 'src'

// plugins: folder cleaning
const CleanWebpackPlugin = require('clean-webpack-plugin')

// plugins: reload & cli output
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const NotifierPlugin = require('webpack-build-notifier')

// plugins: CSS & JS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Notifications options
const NotifierPluginOptions = {
  sound: false,
  notifyOptions: { timeout: 2 },
  messageFormatter: (error, filepath) => filepath,
}

configCSS = {

  entry: {
    app: `./${assets}/sass/app.scss`,
  },

  output: {
    path: thePath('public/css'),
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        include: thePath(`${assets}/sass`),
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2, sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),

    new CleanWebpackPlugin([thePath('public/css')]),
    new FriendlyErrorsWebpackPlugin(),
    new NotifierPlugin({ title: 'CSS', ...NotifierPluginOptions }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] },
      logPrefix: 'Double Dash example',
      files: [
        'public/**/*.*',
      ],
      injectCss: true, // will work once PR merged: https://github.com/Va1/browser-sync-webpack-plugin/pull/79
    }),
  ],

  mode: 'development',

  devtool: 'source-map',

  devServer: {
    quiet: true,
  },

  performance: {
    hints: false,
  },

  stats: {
    children: false,
    entrypoints: false,
    // excludeAssets: /fonts/,
    hash: false,
    modules: false,
    version: false,
  },
}

module.exports = [configCSS]
