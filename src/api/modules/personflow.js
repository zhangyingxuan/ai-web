import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取参数列表
export function fetchCurrentPerson (id) {
  return request({
    url: requestUrl('/passenger/currentPerson?cameraId='+ id),
    method: 'post'
  })
}

// 获取参数信息
export function fetPieData (id) {
  return request({
    url: requestUrl('/passenger/warningTimes?cameraId='+ id),
    method: 'post',
  })
}
// 获取柱状图
export function fetchBarData (id) {
  return request({
    url: requestUrl('/passenger/personTrend?cameraId='+ id),
    method: 'post',
  })
}
// 实时人数统计-前十条
export function fetchTop10 (id) {
  return request({
    url: requestUrl('/passenger/topTen?cameraId='+ id),
    method: 'post',
  })
}