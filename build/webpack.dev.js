const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./webpack.base')
const port = process.env.PORT || 8999

var genHtml=require('./generate-html')

config.module.loaders.push({
  test: /\.js$/,
  loader: 'babel-loader?cacheDirectory=true!area-loader?ENV=dev',
  exclude: [/node_modules/]
})

config.plugins=config.plugins.concat(genHtml('production'))

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
)
config.output.publicPath='/'
config.devtool = 'source-map';

config.devServer = {
  hot: true,
  inline: true,
  // contentBase: './views/',
  quiet: false,
  noInfo: false,
  disableHostCheck: true,
  stats: {
      assets: false,
      colors: true,
      version: false,
      children: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false
  },
  port: port,
  historyApiFallback: true
}

module.exports = config


// const webpack = require('webpack')
// const config = require('./webpack.base')
// const port = process.env.PORT || 8080

// config.plugins.push(
//   new webpack.DefinePlugin({
//     'process.env.NODE_ENV': JSON.stringify('development')
//   }),
//   new webpack.NamedModulesPlugin(),
//   new webpack.HotModuleReplacementPlugin(),
//   new webpack.NoEmitOnErrorsPlugin()
// )

// config.devtool = 'source-map';

// config.devServer = {
//   hot: true,
//   inline: true,
//   contentBase: './views/',
//   quiet: false,
//   noInfo: false,
//   disableHostCheck: true,
//   stats: {
//       assets: false,
//       colors: true,
//       version: false,
//       children: false,
//       hash: false,
//       timings: true,
//       chunks: false,
//       chunkModules: false
//   },
//   port: port,
//   historyApiFallback: true
// }

// module.exports = config
