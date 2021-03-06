import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 实时数据
export function fetchCurrentData (id) {
  return request({
    url: requestUrl('/leave/currentInfo?cameraId='+ id),
    method: 'post'
  })
}

// 报警记录展示-10条
export function fetchTop10 (id) {
  return request({
    url: requestUrl('/hat/list?cameraId='+ id),
    method: 'post',
  })
}
// 前一天的报警次数统计-每小时
export function fetchBarData (id) {
  return request({
    url: requestUrl('/hat/warningTimesOneDay?cameraId='+ id),
    method: 'post',
  })
}
// 前一天的报警次数统计-每小时
export function fetPieData (id) {
  return request({
    url: requestUrl('/hat/warningTimes?cameraId='+ id),
    method: 'post',
  })
}