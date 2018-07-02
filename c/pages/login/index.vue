<template>
  <div style="font-size:16px;height:40px;text-align:center;margin-top:100px;">
    我是登录页面，你想咋地
    <a href="javascript:void();" style="color:red;" @click="onLoginSuccess">点我假装登陆成功</a>
  </div>
</template>

<script>
  import queryInfo from 'modules/query-info'
  import Login from 'modules/login'

  const DEFAULT_PAGE='/index.html'

  export default {
    data(){
      return {
        
      }
    },
    created(){
      var query=queryInfo()
      if(Login.isLogin()&&query.from!=1){  
        //已经登陆的人,并且不是来自未授权页面
        _router.push('index.html')
        return
      } 
    },
    methods:{
      onLoginSuccess(){
         //登陆成功的动作,一般是重刷页面 
         location.href=location.href.replace(/\/[^\/]+$/,DEFAULT_PAGE)
      }
    }
  }
</script>