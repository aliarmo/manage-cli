import cgi from 'modules/interface'
import {api} from 'modules/api'

export default (options={})=>{
 return api.get(cgi.get_addr,options)
}