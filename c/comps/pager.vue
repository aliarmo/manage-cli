
<template>
  <div>
    <el-pagination 
      @size-change="changePage"
      @current-change="changePage"
      :page-size="size"
      :current-page="currPage"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
 
  export default {
    props:['total','size','currPage'],
    methods:{
      changePage(curr){
        //可做翻页上报
        this.$emit('changePage',curr)
      }
    }
  }
</script>