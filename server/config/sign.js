const moment = require("moment");
var crypto = require("crypto");
var createNonceStr = function () {
  return Math.random().toString(36).substr(2); 
};

var createTimestamp = function () {
  timestamp = moment().unix();
  return timestamp;
};

var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法 
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
var sign = function (jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  console.log(url);
  // var ret = {
  //   jsapi_ticket: 'HoagFKDcsGMVCIY2vOjf9nDfXA6tBoU_xOtJ79dczv5dY22NAjcgbjNthzbSrXXYZKCPeTdHSXyvTxod',
  //   nonceStr:'9gnyqgwj72w',
  //   timestamp: '155892322',
  //   url: url
  // };
  let jsapiTicket = `jsapiTicket=${ret.jsapi_ticket}&noncestr=${ret.nonceStr}&timestamp=${ret.timestamp}&url=${ret.url}`;
 console.log(jsapiTicket)
  var sha1 = crypto.createHash("sha1"); //定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
  sha1.update(jsapiTicket);
  var res = sha1.digest("hex"); //加密后的值d
  return {
    noncestr: ret.noncestr,
    timestamp: ret.timestamp,
    signature: res
  };
};

module.exports = sign;