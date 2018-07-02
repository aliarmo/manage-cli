<template>
  <div>
    <ModTitle title="tab2"></ModTitle>
    <div style="font-size:16px;height:40px;text-align:center;margin-top:100px;">
      我是tab2页面，你想咋地
      <router-link to="tab1.html" style="color:red;">点我，看你有没有tab1页面权限</router-link>
    </div>
  </div>
</template>

<script>
  import ModTitle from 'comps/mod-title'
  export default {
    components:{ModTitle}
  }
</script>