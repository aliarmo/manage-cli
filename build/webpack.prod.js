const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')

const CopyWebpackPlugin=require('copy-webpack-plugin')

const pkg = require('../package')
const config = require('./webpack.base')

const cdnUrl = '//vm.gtimg.cn/tencentvideo/script/vmall_manage/'

var genHtml=require('./generate-html')

config.entry.vendor=Object.keys(pkg.dependencies)
config.output.publicPath = cdnUrl
config.output.filename='[name].[chunkhash:6].js' 

config.module.loaders.push({
  test: /\.js$/,
  loader: 'babel-loader?cacheDirectory=true!area-loader?ENV=prod',
  exclude: [/node_modules/]
})

config.plugins=config.plugins.concat(genHtml('production'))

config.plugins.push(
  // new ProgressBarPlugin(),
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
  // new CopyWebpackPlugin(pageNames.map(name=>{
  //   return {from:path.resolve('dist/index.html'),to:path.resolve(`dist/${name}`)}
  // })),
  //代码自动deploy到测试机器，不需要可注释掉
  new WebpackShellPlugin({
    onBuildExit: 'node build/deploy.js'
  })
)

module.exports = config
