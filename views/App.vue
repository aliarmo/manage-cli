<template>
  <div style="height:100%;">
    <div class="wrapper" v-show="!isLogin">   <!-- 如果不需要登录 -->
      <!-- 非法用户 -->
      <div v-if="permission&&permission.iErrCode==8888||isIllegal"> 
        <IllegalPage @confirm="illegalConfirm"></IllegalPage>
      </div>
      <!-- 合法用户v-else -->
      <div v-else-if="permission">
        <!-- 页面布局的一种方式 -->
        <div v-spa="'NORMAL'">
          <LeftMenu></LeftMenu>
          <NavigatorHeader></NavigatorHeader>
          <div class="site_container">
            <div class="container_main">
              <!-- 判断页面权限 -->
              <router-view v-permission="''"></router-view>   
            </div>
          </div>
          <Toast v-show="isShowToast"
                  :title="title"></Toast>
        </div>
        <!-- 区别于上述的另一种布局方式 -->
        <div v-spa="'PRINT'">
          <router-view name="print"></router-view>
        </div>
      </div>
    </div>
    <div class="wrapper" v-show="isLogin">
        <router-view name="login"></router-view>
    </div>
  </div>
</template>

<script>

  import LeftMenu from 'comps/left-menu'
  import NavigatorHeader from 'comps/head'
  import Toast from 'comps/toast'
  import IllegalPage from 'comps/illegal'
  
  import {INIT_ACTION} from './consts'

  import Login from 'modules/login'

  var timer
  var duration=2000
  export default {
    components:{IllegalPage,LeftMenu,Toast,NavigatorHeader},
    data(){
      return {
        title:'',
        isShowToast:false,
        isLogin:false,
        isIllegal:false
      }
    },
    computed:{
      permission(){
        var perm=this.$store.state.payload.permission
        window._permission=perm
        return perm
      }
    },
    created(){
      var that=this
      var path=location.href
      //如果没有登录的话，跳转到登录页
      if(!Login.isLogin()){
        this.isLogin=true
        _router.push('login.html')
        return
      }
      that.$store.dispatch(INIT_ACTION)
      //全局toast
      bus.$on('toast',data=>{
        that.isShowToast=true
        that.title=data.title
        clearTimeout(timer)
        timer=setTimeout(()=>{
          that.isShowToast=false
          data.onCloseCb&&data.onCloseCb()
        },data.duration||duration)
      })
      bus.$on('illegalPage',data=>{
        that.isIllegal=data
      })
    },
    methods:{
      illegalConfirm(){
        this.isLogin=true
        this.isIllegal=false
      }
    }
  }
</script>
