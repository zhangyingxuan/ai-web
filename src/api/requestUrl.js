/**
 * 请求地址统一处理／组装
 * @param {*} actionName action方法名称
 */
export default function (actionName) {
   let baseUrl = '192.168.1.101:8088'
   // let baseUrl = window.location.protocol+ '//'+ window.location.host
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' ? '/api' : baseUrl) + actionName
  // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : baseUrl) + actionName
}
