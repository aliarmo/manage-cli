var jsonp = require('modules/jsonp')

function resHandler(url, resolve, reject, res) {
  if (res.ok) {
    res.text()
      .then(function (text) {
        try {
          resolve(text)
        } catch(e) {
          reject(new Error(`${url} => Invalid json response: ` + text))
        }
      }, reject)
  } else {
    reject(new Error(`${url} => Reqeust fail: ` + res.statusText))
  }
}

// 缺省带cookie
class Fetcher{
  constructor(){
    
  }
  jsonp(url, query) {
    var that=this
    return new Promise((resolve, reject)=>{
      var _reject = reject
      reject = function (err) {
        console.error(err)
        _reject(err)
      }
      jsonp(url, query || {}, function (err, data) {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
  get(url, query, conf) {
    var that=this
    return new Promise((resolve, reject)=>{
      var _reject = reject
      reject = function (err) {
        console.error(err)
        _reject(err)
      }
      return fetch(url, Object.assign({
        method: 'GET',
        credentials: 'include'
      }, conf))
      .then(resHandler.bind(null, url, resolve, reject), reject)
    })
  }
  post(url, body, conf) {
    var that=this
    return new Promise((resolve, reject)=>{
      var _reject = reject
      reject = function (err) {
        console.error(err)
        _reject(err)
      }
      return fetch(url, Object.assign({
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: JSON.stringify(body)
      }, conf))
      .then(resHandler.bind(null, url, resolve, reject), reject)
    })
  }
}



export default Fetcher


export const api=new Fetcher()