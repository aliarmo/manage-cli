<template>
  <div>
    <ModTitle title="首页"></ModTitle>

    <template v-if="areaInfo&&areaInfo.iErrCode==0">
      <ActionRight  v-permission="'INDEX_ADD'"></ActionRight>
      <AreaInfo :areaInfo="areaInfo"></AreaInfo>
      <Pager v-if="areaInfo&&areaInfo.iTotal"  
        :currPage="currPage" 
        :total="areaInfo.iTotal" 
        @changePage="changePage" 
        :size="pagesize"></Pager>
    </template>

    <template v-else-if="!areaInfo">
      <Loading></Loading>
    </template>

    <template v-else>
      <ErrCode :errMsg="'拉取数据失败-'+(areaInfo.iErrCode||1)"></ErrCode>
    </template>
  </div>
</template>
<script>

import ActionRight from './comps/action-right.vue'
import AreaInfo from './comps/area-info.vue'
import ModTitle from 'comps/mod-title'

import {INIT_ACTION,INIT_COMMIT} from './consts'

import {PAGESIZE,NAMESPACE} from './modules/config'
import to from 'modules/to'
import areaInfo from './fetchers/area-info'
import Vuex from 'vuex'

export default {
  components:{ActionRight,AreaInfo,ModTitle},
  data(){
    return { 
      currPage:1,
      pagesize:PAGESIZE
    }
  },
  computed:{
    ...Vuex.mapState(NAMESPACE,{
      areaInfo:state=>state.payload.areaInfo
    })
  },
  created () {
    this.$store.dispatch(`${NAMESPACE}/${INIT_ACTION}`)
  },
  methods:{
    /**
     *翻页
     */
    changePage(curr){
      this.currPage=curr
      this.filterReq()
    },
    /**
     *翻页请求者
     */
    async filterReq(){
      var that=this
      var commitPath=`${NAMESPACE}/${INIT_COMMIT}`
      that.$store.commit(commitPath,{areaInfo:''})   //为了出现loading动画
      /**
      *传统方式
      */
      // areaInfo({
      //   iPage:that.currPage-1,
      //   iPageSize:that.pagesize
      // }).then(data=>{
      //   that.$store.commit(commitPath,{areaInfo:data})
      // }).catch(err=>{
      //   that.$store.commit(commitPath,{areaInfo:{}})
      // })
      

      //新方式，推荐，代码更优雅
      var [err,data] = await to(areaInfo({
        currPage:this.currPage
      }))
      that.$store.commit(commitPath,{areaInfo:data || err || {}})
    }
  }
}
</script>