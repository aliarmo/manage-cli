const path = require('path')
const CopyWebpackPlugin=require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app:'./views/entry.js'
  },
  output: {
    path: path.join(__dirname, '../dist')
  },
  externals: {
    "Vue": 'Vue',
    "vue": 'Vue'
  },
  resolve: {
    extensions: ['.js', '.vue','.json'],
    alias: {
        comps: path.resolve('c/comps'),
        directives: path.resolve('c/directives'),
        pages: path.resolve('c/pages'),
        modules: path.resolve('c/modules'),
        models: path.resolve('c/models')
        // vue: 'vue/dist/vue.js'  // why: https://segmentfault.com/a/1190000006435886
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loaders: ['vue-loader','scope-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
          from:path.resolve('./views/asserts')
        }])
  ]
}



// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: {
//     app: './views/entry.js'
//   },
//   output: {
//     path: path.join(__dirname, '../dist'),
//     filename: '[name].js' //,
//   },
//   externals: {
//     "Vue": 'Vue',
//     "vue": 'Vue'
//   },
//   resolve: {
//     extensions: ['*','.js', '.vue','.json'],
//     alias: {
//         comps: path.resolve('c/comps'),
//         pages: path.resolve('c/pages'),
//         modules: path.resolve('c/modules'),
//         directives: path.resolve('c/directives'),
//         models: path.resolve('c/models'),
//         vue: 'vue/dist/vue.js'  // why: https://segmentfault.com/a/1190000006435886
//     }
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.vue$/,
//         loaders: ['vue-loader']
//       },
//       {
//         test: /\.js$/,
//         loader: 'babel-loader?cacheDirectory=true',
//         exclude: [/node_modules/]
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './views/index.html'
//     })
//   ]
// }
