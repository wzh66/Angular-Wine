export class PayDto {
  appId: string;     // 公众号名称，由商户传入
  timeStamp: string;         // 时间戳，自1970年以来的秒数
  nonceStr: string; // 随机串
  package: string;
  signType: string;         // 微信签名方式：
  paySign: string;
  orderNo?: string;
  tradeNo?: string;
}
