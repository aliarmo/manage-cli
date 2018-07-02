<template>
  <div class="pop_outer">
    <div class="pop_mask"></div>
    <div class="pop pop_model">
      <a href="javascript:void(0);" @click="onLogin" class="pop_close"><i class="icon icon_close"><svg class="svg_icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_icon_close"></use></svg></i></a>
      <div class="pop_bd">
        <div class="pop_txt">对不起，您暂时没有权限，如有问题，请联系：微信@mobaojunwmy</div>
      </div>
      <div class="pop_ft">
        <a href="javascript:void(0);" @click="onLogin" class="btn_normal">确定</a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    methods:{
      onLogin(){
        this.$emit('confirm')
        _router.push('login.html?from=1')   
      }
    }
  }
</script>