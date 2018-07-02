var url=require('modules/url')

export default ()=>{
  return url.queryParse(location.search)||{}
}