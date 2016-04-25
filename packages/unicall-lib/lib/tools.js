/**
 * Created by Junwei on 15/12/24.
 */
//解析url 可兼容服务端和客户端
Unicall.tools.parseUrl = function (url) {
  var reURLInformation = new RegExp([
    '^(https?:)//', // protocol
    '(([^:/?#]*)(?::([0-9]+))?)', // host (hostname and port)
    '(/[^?#]*)', // pathname
    '(\\?[^#]*|)', // search
    '(#.*|)$' // hash
  ].join(''));
  return reURLInformation.exec(url);
};

//获取二级路径,解决开发环境与产品环境多一级路径问题
Unicall.tools.getPath = function (url) {
  return Unicall.tools.parseUrl(Meteor.absoluteUrl())[5] + url;
};
