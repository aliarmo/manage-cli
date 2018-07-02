<template>
  <div class="mod_manage_table">
    <table>
      <thead>
        <tr>
          <th class="ta_center">序号</th>
          <th class="ta_center">名称</th>
          <th class="item_control">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="areaInfo.vecAddr&&areaInfo.vecAddr.length">
          <tr v-for="(item,key) in areaInfo.vecAddr">
            <td class="ta_center"><span>{{key+1}}</span></td>
            <td class="ta_center"><span>{{item.strName}}</span></td>
            <td class="item_control">
              <a href="javascript:void(0);"
                  v-permission="op.permission" 
                  v-for="op in operate" 
                  @click="onDeal(op.opStr,item,key)">{{op.title}}</a>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td class="ta_center" colspan="3">暂时没有数据</td>
          </tr>
        </template>
      </tbody>
    </table>               
  </div>
</template>

<script>

  export default {
    components:{},
    props:['areaInfo','statusMap'],
    data(){
      return {
        operate:[
        {
          title:'修改',
          opStr:'edit',
          permission:'INDEX_MODIFY'
        },{
          title:'删除',
          opStr:'del',
          permission:'INDEX_DELETE'
        },{
          title:'查看详情',
          opStr:'checkDetail',
          permission:'INDEX_DETAIL_READ'
        }]
      }
    },
    methods:{
      onDeal(name,item,key){
        this[name]&&this[name](item,key)
      },
      edit(){
        alert("你有修改权限")
      },
      del(){
        alert('你有删除的权限')
      },
      checkDetail(){
        alert('你有查看详情权限')  
        // _router.push('INDEX_detail')
      }
    }
  }
</script>