

class Fetcher{
  constructor(list={}){
    this.list=list
  }
  fetchData(callback){
  	var that=this
  	var all=[]
  	var keys=Object.keys(that.list)
  	keys.forEach(key=>{
  		all.push(that.list[key]())
  	})
    return Promise.all(all).then(data=>{
    	var res={}
    	keys.forEach((key,index)=>{
    		res[key]=data[index]
    	})
      callback&&callback(null,res)
    	return res
    }).catch(err=>{
      callback&&callback(err)
      return err
    })
  }
}

export default Fetcher