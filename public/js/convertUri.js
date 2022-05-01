import Url from 'url-parse';
import queryString from 'query-string';
function covert(url){
  const url = value.uploadUrl
  const uri = new Url(url)

  const query = queryString.parse(uri.query)

  return query
}
export {covert}
