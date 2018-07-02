import areaInfo from 'models/area'

export default (options={})=>{
	return areaInfo(Object.assign({
        iType:1,
        iId:0
      },options)).then(text=>{
      	var data=JSON.parse(text.replace(/^data=/,''))
      	data=data.data
      	data.iTotal=21	
      	data.iErrCode=0
		return data
	})
}