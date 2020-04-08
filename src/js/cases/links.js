export function insertParam(key, value)
{
  key = encodeURI(key); value = encodeURI(value)

  var kvp = document.location.search.substr(1).split('&')

  var i=kvp.length; var x; while(i--) 
  {
    x = kvp[i].split('=')

    if (x[0]===key)
    {
      x[1] = value
      kvp[i] = x.join('=')
      break
    }
  }

  if(i<0) {kvp[kvp.length] = [key,value].join('=')}

  //this will reload the page, it's likely better to store this until finished 
  history.pushState(null, null, kvp.join('?'))
}


export function getQueryParams() {
  var qs = document.location.search.split('+').join(' ')
  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
  }
  return params
}
