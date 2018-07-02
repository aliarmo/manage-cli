import {PERMISSION,INIT_ACTION} from './consts'

import fetchAllData from './fetchers/'


export default {
  state:{
    payload:{
      permission:''
    }
  },
  mutations:{
    [PERMISSION](state,data){
      Object.assign(state.payload,data)
    }
  },
  actions:{
    [INIT_ACTION]({commit}){
      fetchAllData((err,data)=>{
        if(err){
          console.log('GET INIT ERROR',err)
          return 
        }
        console.log('FetcherAllData',data)
        commit(PERMISSION,data)
      })
    }
  }
}