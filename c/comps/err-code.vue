<template>
  <div class="err-tips" :class='large'>
    {{errMsg}}
    <div v-if="reloadMsg"
         @click="reload"
         class="reload">
      {{reloadMsg}}
    </div>
  </div>
</template>
<script>
  
  export default {
    props:['errMsg','reloadMsg','large'],
    methods:{
      reload(){
        this.$emit('reload')
      }
    }
  }
</script>