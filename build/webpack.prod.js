const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pkg = require('../package')
const config = require('./webpack.base')

const cdnUrl = '//vm.gtimg.cn/tencentvideo/script/vmall_manage/'

config.entry.vendor=Object.keys(pkg.dependencies)
config.output.publicPath = cdnUrl
config.output.filename='[name].[chunkhash:6].js' 

config.plugins.push(
  new HtmlWebpackPlugin({
    template:"./views/index.html",
    ENV:'production'
  }),
  new ProgressBarPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_debugger: true
    },
    comments: false
  }),
  // extract vendor chunks
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash:4].js'
  }),
  //代码自动deploy到测试机器，不需要可注释掉
  new WebpackShellPlugin({
    onBuildExit: 'node build/deploy.js'
  })
)

module.exports = config
