<!-- 左侧导航 开始 -->
<!-- logo部分开始 -->
<template>
  <div>
    <div class="site_logo ">
    	<a href="javascript:;" class="btn_nav_toggle"><i class="icon icon_nav_toggle"><svg class="svg_icon"><use xlink:href="#svg_icon_nav_toggle"></use></svg></i></a>
    	<a href="javascript:void(0);" class="logo"><i class="icon_logo"></i><span class="txt">后台管理系统</span></a>
    </div>
    <!-- 左侧导航 开始 -->
    <div class="site_nav">
      <RunLeftMenu></RunLeftMenu>
    </div>
  </div>
</template>
<script>
  
  import RunLeftMenu from 'comps/run-left-menu'

  export default {
    components:{RunLeftMenu},
  }
</script>
