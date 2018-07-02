/**
 *滚动加载
 */

var timer
var throttle_def=300
var PIXEL_THRESHOLD=40  //距离底部40px的时候去加载数据

export default (options={},cb)=>{
  var throttle=options.throttle || throttle_def
  if(timer) clearTimeout(timer)
  timer=setTimeout(()=>{
    var $el=options.el || document.body
    var interval=$el.scrollHeight-$el.clientHeight
    var scrollTop
    if(options.el){
      scrollTop=$el.scrollTop
    }else{
      //有时候就算是chrome也不一定能拿到document.body
      scrollTop=document.body.scrollTop || document.documentElement.scrollTop   
    }
    var pixel=options.pixel || PIXEL_THRESHOLD
    if(interval-scrollTop<pixel){
      cb()
    }
  },throttle)
}