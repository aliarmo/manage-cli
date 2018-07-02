import Fetcher from 'modules/fetcher'
import areaInfo from './area-info'

var all={
  areaInfo
}

export default function(callback){
 return new Fetcher(all).fetchData(callback)
}