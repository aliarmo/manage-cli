var fakeData={
  1048: true,   //假设当前用户有，首页管理(读)权限
  1049: true,   //假设当前用户有，首页详情(读)权限
  1050: false,  //假设当前用户没有，首页删除权限
  1051: true,   //假设当前用户有，首页修改权限
  1052: true,    //假设当前用户有，首页新增
  1053: true,    //假设当前用户有，tab1页面(读)权限
  1054: false    //假设当前用户有，tab2页面(读)权限
}

export default (options)=>{
  return Promise.resolve(fakeData)
} 