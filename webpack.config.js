const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require("imagemin-webpack")

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const fileName = (ext) => isDev
  ? `[name].${ext}`
  : `[name].[contenthash].${ext}`

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const plugins = () => {
  const basePlugins = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
  ]

  if (isProd) {
    basePlugins.push(
      new ImageminPlugin({
        bail: false,
        cache: true,
        imageminOptions: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: [
                  {
                    removeViewBox: false
                  }
                ]
              }
            ]
          ]
        }
      })
    )
  }

  return basePlugins
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/main.js',
  output: {
    filename: `./js/${fileName('js')}`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
    // publicPath: '/couch-training-components/'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true,
    port: 3000
  },
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
    
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/shared/alerts.html'),
      filename: 'alerts.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/shared/header.html'),
      filename: 'header.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/shared/button.html'),
      filename: 'button.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/shared/user-card.html'),
      filename: 'user-card.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/shared/modal.html'),
      filename: 'modal.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/shared/title.html'),
      filename: 'title.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/shared/dictionary.html'),
      filename: 'dictionary.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/shared/dictionary-call-to-action.html'),
      filename: 'dictionary-call-to-action.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/shared/user-status.html'),
      filename: 'user-status.html',
    }),

    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/search/search-filter.html'),
      filename: 'search-filter.html',
    }),

    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/contacts/contacts-call-statistics.html'),
      filename: 'contacts-call-statistics.html',
    }),

    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/word-learning/word-learning-confrim-form.html'),
      filename: 'word-learning-confrim-form.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/word-learning/word-learning-list.html'),
      filename: 'word-learning-list.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/word-learning/word-learning-word.html'),
      filename: 'word-learning-word.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/word-learning/word-learning-settings-form.html'),
      filename: 'word-learning-settings-form.html',
    }),

    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-topbar.html'),
      filename: 'profile-topbar.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-sidebar.html'),
      filename: 'profile-sidebar.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-verification.html'),
      filename: 'profile-verification.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-main.html'),
      filename: 'profile-main.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-content-box.html'),
      filename: 'profile-content-box.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-feedback.html'),
      filename: 'profile-feedback.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-rating.html'),
      filename: 'profile-rating.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-balance.html'),
      filename: 'profile-balance.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-statistics.html'),
      filename: 'profile-statistics.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-settings.html'),
      filename: 'profile-settings.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-header.html'),
      filename: 'profile-header.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-data-form.html'),
      filename: 'profile-data-form.html',
    }),
  ],
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `./img/*/${fileName('[ext]')}`
            }
          }
        ]
      },
      {
        test: /\.(?:|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `./fonts/${fileName('[ext]')}`
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        loader: 'babel-loader'
      }
    ]
  }
}
