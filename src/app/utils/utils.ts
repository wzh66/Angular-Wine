const isCn = function (str) {
  if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
    return false;
  }
  return true;
};

export function formData(body: object): FormData {
  const _formData: FormData = new FormData();
  for (const kn in body) {
    if (body) {
      _formData.append(kn, body[kn] === undefined ? '' : body[kn]);
    }
  }
  return _formData;
}

export function formDataToUrl(body: object, ifFist?: boolean): string {
  let str = '';
  for (const keyName in body) {
    if (!str && ifFist) {
      str = '?' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(encodeURI(body[keyName])));
    } else {
      str = str + '&' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(encodeURI(body[keyName])));
    }
  }
  return str;
}

export function getIndex(arr, key, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) {
      return i;
    }
  }
}

export function fmtCallbackUrl(url) {
  const params = [];
  if (url.indexOf('?') === -1) {
    return url;
  } else {
    const arr = url.split('?');
    let path = arr[0];
    const queryParams = arr[1].split('&');
    queryParams.forEach((param) => {
      const key = param.slice(0, param.indexOf('='));
      if (key !== 'openid' && key !== 'key' && key !== 'id' && key !== 'referee') {
        params.push(param);
      }
    });
    params.forEach((param, index) => {
      path = path + (index === 0 ? '?' : '&') + param;
    });
    return path;
  }
}

import {PayDto} from '../@core/dto/pay.dto';

declare var WeixinJSBridge: any;

export function onBridgeReady(body: PayDto, callback) {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      'appId': body.appId,     // 公众号名称，由商户传入
      'timeStamp': body.timeStamp,         // 时间戳，自1970年以来的秒数
      'nonceStr': body.nonceStr, // 随机串
      'package': 'prepay_id=u802345jgfjsdfgsdg888',
      'signType': 'MD5',         // 微信签名方式：
      'paySign': body.paySign // 微信签名
    },
    function (res) {
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        callback();
        // 使用以上方式判断前端返回,微信团队郑重提示：
        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      }
    });
}

// if (typeof WeixinJSBridge == "undefined"){
//   if( document.addEventListener ){
//     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
//   }else if (document.attachEvent){
//     document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
//     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
//   }
// }else{
//   onBridgeReady();
// }
