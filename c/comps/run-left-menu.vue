<template>
  <div class="menu_box">
    <dl class="menu" v-permission="'INDEX'">
      <dt class="menu_title"><i class="icon_list"></i>首页管理
      </dt>
      <dd class="menu_item" 
            v-permission="'INDEX_READ'">
        <router-link to="index.html">首页</router-link>
      </dd>
    </dl>
    <dl class="menu" v-permission="'TAB'">
      <dt class="menu_title">
        <i class="icon_commodity"></i>tab管理
      </dt>
      <dd class="menu_item" 
            v-permission="'TAB1_READ'">
        <router-link to="tab1.html">tab1</router-link>
      </dd>
      <dd class="menu_item" 
            v-permission="'TAB2_READ'">
        <router-link to="tab2.html">tab2</router-link>
      </dd>
    </dl>
  </div>
</template>

<script>
  
  export default {
    
  }
</script>