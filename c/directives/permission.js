/**
 *权限指令
 */
import {PERMISSION,PERMISSION_PATH} from 'modules/permission-config'
import bus from 'modules/bus'

var permission = {}

Vue.directive('permission',{
  bind(el,{value,arg}){
   var name
   if(!value){
    var pathname=location.pathname
    var matched=pathname.match(/\/([^/.]+)\.html/)||[]
    name=matched[1]
    value=PERMISSION_PATH[name]
   }
   permission=window._permission||{}
   var neededPermission = PERMISSION[value]||[]
   if(!neededPermission.some(p=>{   //如果没有通过这个权限列表的检测
      return permission[p]
   })){
     el.style.display = 'none'
     if(name){   //说明访问了非法的页面
        bus.$emit('illegalPage',true)
     }  
   }
  }
})