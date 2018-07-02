<template>
  <div class="add_action_right">
    <div class="action_right_cont">
      <a href="javascript:void(void);" class="btn_normal_add"
            @click="add">+ 新增</a>
      </div>
  </div>
</template>

<script>
  
  export default {
    methods:{
      add(){
        alert("你有权限新增")
      }
    }
  }
</script>