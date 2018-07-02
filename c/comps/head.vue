<!-- 顶部信息栏 开始-->
<template>
  <div class="container_top" style="padding: 10px;">
    用有四个页面，index.html，tab1.html，tab2.html，login.html
    目前设定的是没有tab2.html页面权限，所以在左边的导航栏看不到tab2.html页面入口
    index.html中用户有新增、修改和查看详情权限，但是没有删除权限，所以看不到删除按钮，可以
    在views/fetchers/permission.js里面进行权限配置
  </div>
</template>