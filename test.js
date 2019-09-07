let url = 'http://www.newplan123.com/admin/finance/records?openid=ojGXa1R7cJUow4ea1I46y1n2OZlc&key=&id=null&cc=123';

function fmtCallbackUrl(url) {
  const params = [];
  if (url.indexOf('?') === -1) {
    return url;
  } else {
    const arr = url.split('?');
    let path = arr[0];
    const queryParams = arr[1].split('&');
    queryParams.forEach(function (param) {
      const key = param.slice(0, param.indexOf('='));
      if (key !== 'openid' && key !== 'key' && key !== 'id') {
        params.push(param);
      }
    });
    params.forEach(function (param, index) {
      path = path + (index === 0 ? '?' : '&') + param;
    });
    return path;
  }
}

fmtCallbackUrl(url);
