/**
 *图片加载失败指令
 */
/**
 * type 为：
 * v：竖图
 * h：横图
 * s：方图
 * a：头像
 */
function picerr(num) {
    var p = "blank";
    if (typeof num == "number") {
        if (num == 2 || num == 5 || num == 9 || num == 11 || num == 12 || num == 14 || num == 15 || num == 16 || num == 19) {
            p = "pic_h";
        } else if (num == 1 || num == 6 || num == 7 || num == 13 || num == 17) {
            p = "pic_v";
        } else {
            p = "pic_s";
        }
    } else {
        if (num == "h" || num == "v" || num == "s") {
            p = "pic_" + num;
        } else if (num == "a") {
            p = "avatar";
        }
    }
    return "//i.gtimg.cn/qqlive/images/20150608/" + p + ".png";
}

Vue.directive('imgerr',(el,{value,arg})=>{
  if(!value){
      _onerror()
      return
    }
    el.src=value
    el.onerror=_onerror
    el.onload=_onload
    function _onerror(){
      if(el.isErr) return
      el.style.visibility=''
      var errSrc=picerr(arg)
      el.src=errSrc
      el.isErr=true
    }
    function _onload(){
      el.isErr=false
    }
})

//这里提供了一个等图片完全加载后才显示的方案
Vue.directive('loaded',(el,{value,arg})=>{
  var img=new Image()
  img.src=value
  img.onload=function(){
    el.src=value
  }
})