import utils from 'modules/utils'

Vue.filter('formateDate',utils.formateDate)

Vue.filter('chineseLen',str=>{
  if(!str) return 0
  return str.length
})

Vue.filter('together',data=>{
  if(!data) return ''
  return data.join(';')
})