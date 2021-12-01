import { request } from '@/api/service'
const apiPrefix = '/setting.region'
export function GetList (query) {
  return request({
    url: apiPrefix + '/list',
    method: 'post',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: apiPrefix + '/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: apiPrefix + '/edit',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: apiPrefix + '/del',
    method: 'post',
    data: { id }
  })
}