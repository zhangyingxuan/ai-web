import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import qs from 'qs'

// 获取验证码
export function captcha (uuid) {
  return request({
    url: requestUrl('/captcha?uuid=' + uuid),
    method: 'get',
  })
}

// 登录
export function login (params) {
  return request({
    url: requestUrl('/login'),
    method: 'post',
    data: requestParam(params)
  })
}

// 退出
export function logout () {
  return request({
    url: requestUrl('/sys/logout'),
    method: 'post',
    data: requestParam()
  })
}

// 退出
export function executeShell (params) {
  return request({
    url: requestUrl('/shell/executeShell'),
    method: 'post',
    // params: requestParam(params, 'post'),
    // data: params,
    data: qs.stringify(params),
    // data: requestParam(params),
    headers:{
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json; charset=utf-8',
      // 'Content-type': 'multipart/form-data'
    },
  })
}
