const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
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
      new UglifyJsPlugin(),
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
      template: path.resolve(__dirname, 'src/components/shared/topbar.html'),
      filename: 'topbar.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/shared/input.html'),
      filename: 'input.html',
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
      template: path.resolve(__dirname, 'src/components/profile/profile-main.html'),
      filename: 'profile-main.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/components/profile/profile-content-box.html'),
      filename: 'profile-content-box.html',
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
