const HtmlWebpackPlugin = require('html-webpack-plugin')

var path=require('path')
var fs=require('fs')

var pageNames=fs.readdirSync(path.resolve('c/pages')).map(name=>{
  return `${name}.html`
})
var origin=path.resolve('views/index.html')
module.exports=(env)=>{
  return pageNames.map((name)=>{
    return new HtmlWebpackPlugin({
      template:origin,
      ENV:env,
      filename:name
    })
  })
}