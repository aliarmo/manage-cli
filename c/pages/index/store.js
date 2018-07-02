import {
  INIT_COMMIT,
  INIT_ACTION
} from './consts'

import fetchAllData from './fetchers/'

export default {
  namespaced: true,
  state: {
    payload: {
      areaInfo:''
    }
  },
  mutations: {
    [INIT_COMMIT](state, data) {
      Object.assign(state.payload, data)
    }
  },
  actions: {
    [INIT_ACTION]({
      commit
    }) {
      fetchAllData(function(err,data) {
        if(err){
          console.log('init ','get data error')
          return 
        }
        console.log("fetchAllData", data)
        commit(INIT_COMMIT, data)
      }).then().catch(function() {

      })
    }
  }
}