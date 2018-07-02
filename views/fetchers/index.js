import Fetcher from 'modules/fetcher'
import permission from './permission'

const all={
	permission
}

export default (callback)=>{
  return new Fetcher(all).fetchData(callback)
}