/**
 *页面onload后需要干的事情
 */


var fnList=[]
var isOnload=false

var onload=()=>{
  fnList.forEach(fn=>{
    fn && (!fn.isDown) &&fn()          
  })
}

window.onload=()=>{
  isOnload=true
  onload()
}

export default {
  add(cb,args){
    fnList.push(()=>{
      cb&&(cb.isDown=true)
      cb&&cb(args)
    })
    if(isOnload){      //如果在onload之后才加入，那马上执行
      onload()
    }
  },
  reomve(cb){
    if(!cb) return fnList=[]
    var index=fnList.indexOf(cb)
    if(~index){
      fnList.splice(index,1)
    }
  }
}