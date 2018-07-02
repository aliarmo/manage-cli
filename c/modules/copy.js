import utils from 'modules/utils' 
//es6实现深度复制
export default (obj)=>{
  if(!obj) return {}
  return JSON.parse(JSON.stringify(obj))
}

//应用场景，用远程拿到的数据深度覆盖初始数据状态
//策略：target中属性值为null，''，undefined的保留origin原值，属性值为0的如果有isKeepZero则保留，否则至为''
//如果target是空对象或空数组的话，就用origin里面的对象或数组
export const override=(origin,target,options={})=>{
  for(var key in target){
    var type=utils.getType(target[key])
    if(!target[key]||(type!=='object'&&type!=='array')){
      origin[key]=utils.isNull(target[key]) ? origin[key] : 
                  (target[key]===false ? false : ( options.isKeepZero && target[key]===0 ? 0 : target[key]||''))   
    }else{
      origin[key]=override(origin[key]||(type==='array'?[]:{}),target[key] ,options)
    }
  }
  return origin
}