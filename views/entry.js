import 'babel-polyfill'

import Vuex from 'vuex'
/**
 *全局注册常用组件
 */
require('modules/register-global-comps')

import App from './App.vue'

//注册过滤器
import filter from 'modules/filter'

//注册自定义指令
require('directives/imgerr')
require('directives/spa')
require('directives/permission')

/**
 *引入页面store
 */
import appStore from './store'
import indexStore from 'pages/index/store'

/**
 *注册路由
 */
import router from 'modules/router'

Vue.use(Vuex)

var allStore = {
  modules: {
    index: indexStore
  }
}
Object.assign(allStore,appStore)

const store = new Vuex.Store(allStore)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

import winOnload from 'modules/window-onload'

winOnload.add(()=>{
  //可在页面完全加载后做曝光上报，或预加载其他资源
})

router.beforeEach((to, from, next) => {
  //路由切换，可在此做目的页面的曝光上报，利用to.name
  next()
})