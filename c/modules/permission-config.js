/**
 *权限配置
 */


//权限语义化
const PERMISSION = {
      'INDEX'                    : [1048],           //首页tab
      'TAB'                      : [1053,1054],      //tab下有tab1,tab2，某个权限的集合
      
      'INDEX_READ'               : [1048],   //首页管理(读)权限
      'INDEX_DETAIL_READ'        : [1049],   //首页详情(读)权限
      'INDEX_DELETE'             : [1050],    //首页删除权限
      'INDEX_MODIFY'             : [1051],    //首页修改权限
      'INDEX_ADD'                : [1052],    //首页新增
      'TAB1_READ'                : [1053],    //tab1页面(读)权限
      'TAB2_READ'                : [1054]     //tab2页面(读)权限
}

//页面所需要的权限
const PERMISSION_PATH={
  index:'INDEX_READ',                  //直接访问首页页面url的时候所需要的权限
  tab1:'TAB1_READ',
  tab2:'TAB2_READ'
} 

export{
  PERMISSION,
  PERMISSION_PATH
}


