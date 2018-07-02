/**
 *监听window的滚动加载
 */


import lazyScroll from 'modules/lazy-scroll'

var fnList=[]

var timer
var throttle=300

window.onscroll=function(){
  lazyScroll({},()=>{
    fnList.forEach(fn=>{
      fn&&fn()
    })
  })
}

export const addWinScrollHandler= (cb)=>{
  fnList.push(cb)
}
export const delWinScrollHandler= ()=>{
  fnList=[]
}