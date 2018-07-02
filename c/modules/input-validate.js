/**
 *表单有效性验证，可有效减少if
 */

import utils from 'modules/utils'
import backToTop from 'modules/back-to-top'

export default (vecValidate=[],val)=>{
  var type=utils.getType(val)
  if(type=='array'){
    val=val.join('')
  }else if(type=='object'){
    val=(Object.keys(val) || []).length || ''
  }
  return vecValidate.every(cond=>{
    if(!cond) return true
    if(cond.isNeeded && utils.isNull(val) ||
        cond.isNotZero && +val===0  ||
        cond.reg && !cond.reg.test(val) ||
        !utils.isNull(cond.gt) && !(+val>cond.gt) ||
        !utils.isNull(cond.gte) && !(+val>=cond.gte) ||
        !utils.isNull(cond.lt) && !(+val<cond.lt) ||
        !utils.isNull(cond.lte) && !(+val<=cond.lte)
      ){
      if(!utils.isNull(cond.backPixel)){
        backToTop(cond.backPixel)
      }
      bus.$emit('toast',{title:cond.title})
      return false
    }
    return true
  })
}