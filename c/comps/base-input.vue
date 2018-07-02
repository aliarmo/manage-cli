<template>
  <li>
    <label class="filter_label">{{title}}
      <span class="color_red">{{isNeeded?'*':''}}</span>
    </label> 
    <div>
      <el-input v-model.trim="val"
        v-bind="$attrs"
        :placeholder="placeholder||'请输入'"
        :maxlength="maxlength">
      </el-input>
    </div>
    <slot></slot>
    <span class="input_tip_el" v-if="maxlength">
      <span class="color_red">{{val.length}}</span>/{{maxlength}}
    </span>
  </li>
</template>

<script>
  
  export default {
    inheritAttrs:false,
    props:['value','title','placeholder','maxlength','isNeeded'],
    data(){
      return {
        val:this.value
      }
    },
    watch:{
      value(){
        this.val=this.value
      },
      val(){
        this.$emit('input',this.val)
      }
    }
  }
</script>