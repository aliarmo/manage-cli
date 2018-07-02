export const L_TOW_POINT=/^(\d+|\d+\.\d{1,2})$/  //是否为整数或者两位小数
export const INTEGER=/^\d+$/             //整数
export const G_TOW_POINT=/\d+\.\d{3,}/   //大于两位位小数
export const NUM=/^(\d+|\d+\.\d+)$/     //是否为数字
export const URL=/^(http:|https:)?\/\// //是否合法链接

export default {
  isInteger(num){
    return INTEGER.test(num)
  },
  isThreeMore(num){   
    return G_TOW_POINT.test(num)
  },
  isNumLegal(num){  
    return L_TOW_POINT.test(num)
  },
  isNum(num){  
    return NUM.test(num)
  },
  isZero(num){
    return num===0
  },
  isUrl(link){
    return URL.test(link)
  }
}

