/**
 *路由配置
 */

import VueRouter from 'vue-router'
import Tab1 from 'pages/tab1'
import Tab2 from 'pages/tab2'
import Login from 'pages/login'
import Index from 'pages/index'

var routes = [{
  path: '/', 
  component: Index,
  name:'absIndex'        //命名路由，可用于数据上报
}, {
  path: '/index.html', 
  component: Index,
  name:'index'
},{
  path:'/tab1.html',
  component:Tab1,
  name:'tab1'
},{
  path:'/tab2.html',
  component:Tab2,
  name:'tab2'
},{
  path:'/login.html',
  components:{
    login:Login      //命名视图的路由写法
  },
  name:'login'
}
]

const prefix='/vmall_manage'

routes=[...routes,...routes.map(r=>{
  return Object.assign({},r,{path:prefix+r.path,
                          name:'vmall_manage'+r.path})
})]

const router = window._router = new VueRouter({
  routes,
  mode: 'history'
})

export default router