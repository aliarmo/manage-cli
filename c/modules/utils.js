import legal from 'modules/legal-check'

function formateDate(time) {
  if (!time) return ''
  var date = new Date(time)
  var month = date.getMonth() + 1
  month = month < 10 ? '0' + month : month
  var day = date.getDate()
  day = day < 10 ? '0' + day : day
  var hour = date.getHours()
  hour = hour < 10 ? '0' + hour : hour
  var min = date.getMinutes()
  min = min < 10 ? '0' + min : min
  var sec = date.getSeconds()
  sec = sec < 10 ? '0' + sec : sec
  return `${date.getFullYear()}-${month}-${day} ${hour}:${min}:${sec}`
}

function mixArr(first, second) {
  var res = []
  if (!first || !second) return res
  var len
  if (first.length > second.length) {
    len = first.length
  } else {
    len = second.length
  }
  for (var i = 0; i < len; i++) {
    res.push({
      url: first[i] || ''
    }, {
      cnt: second[i] || ''
    })
  }
  return res
}

function recover(content) { 
  if (!content) return ''
  var res = []
  content.replace(/<p>(.+?)<\/p>|<img.+?src=['"](.+?)["'](.+?|)|<video.+?src=['"]({.+?})["'](.+?|)><\/video>/gim, function(a, b, c,empty, d) {
    if (b) {
      res.push({
        cnt: b
      })
    }
    if (c) {
      res.push({
        url: c
      })
    }
    if(d) {
      res.push({
        video:JSON.parse(d)
      })
    }
    return ''
  })
  return res
}

function escape(str) {
  str = str || ''
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
}

function isNull(val) {
  if (val === '' || val === undefined || val === null) {
    return true
  }
  return false
}

function seq(){
  return ""+Math.random()
}

function https(url){
  url=url||''
  return url.replace(/^(http:)?\/\//,'https://')
}

function indexOf(arr,tar,keyFir,keySec){
  keySec=keySec||keyFir
  var index=-1
  var localTar
  var localItem
  arr.some((item,i)=>{
    localTar=tar?tar[keySec||i]:tar
    localItem=keyFir?item[keyFir]:item
    if(localItem===localTar){
      index=i
      return true
    }
  })
  return index
}

function getType(type){
  var matched=Object.prototype.toString.call(type).match(/\[object (\w+)\]/)||[]
  return (matched[1]||'').toLowerCase()
}

function append(targetLen,currLen,fn){
  var interval=targetLen-currLen
  if(interval<=0) return
  while(interval--){
    fn()
  }
}

function toPascalCase(name){
  return name.split('-').map(part=>part.replace(/^(\w{1})(\w+)/,(all,fir,rest)=>{
      return `${fir.toUpperCase()}${rest}`
  })).join('')
}

function toHexColor(num){
  if(!num) return ''
  if(!legal.isInteger(num)) return ''
  var strColor=num.toString(16)
  while(strColor.length<6){
    strColor="0"+strColor
  }
  return strColor
}

function unescape(markup){
    if (!markup) return '';
    return String(markup)
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');
}

function escape(markup){
    if (!markup) return '';
    return String(markup)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;');
}

export default {
  formateDate,
  mixArr,
  escape,
  recover,
  isNull,
  seq,
  https,
  indexOf,
  getType,
  append,
  toPascalCase,
  toHexColor,
  unescape,
  escape
}