import { request } from '@/api/service'
const apiPrefix = '/auth.menu'
export function GetList (query) {
  return request({
    url: apiPrefix + '/list',
    method: 'post',
    params: query
  })
}
export function GetTree (query) {
  return request({
    url: apiPrefix + '/tree',
    method: 'post',
    params: query
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
    params: { id }
  })
}

export function GetObj (id) {
  return request({
    url: apiPrefix + '/info',
    method: 'get',
    params: { id }
  })
}
