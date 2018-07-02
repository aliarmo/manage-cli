/**
 *布局变更指令
 */
const PRINT_URL={
  ordering_print:true
}

Vue.directive('spa',{
  bind(el,{value,arg}){
    var _router=window._router
    var _curr=_router.currentRoute
    var name=_curr.name
    if(PRINT_URL[name]&&value!='PRINT'){
      el.style.display='none'
    }
  }
})