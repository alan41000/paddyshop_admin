import { request } from '@/api/service'
const apiPrefix = '/order.aftersale'
export function GetList (data) {
  return request({
    url: apiPrefix + '/list',
    method: 'post',
    data: data
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
    url: apiPrefix + '/update',
    method: 'post',
    data: obj
  })
}

export function DelObj (id) {
  return request({
    url: apiPrefix + '/delete',
    method: 'post',
    data: { id : id }
  })
}

export function Refuse (data) {
  return request({
      url: apiPrefix + '/refuse',
      method: 'post',
      data: data
  })
}

export function Audit (data) {
  return request({
      url: apiPrefix + '/audit',
      method: 'post',
      data: data
  })
}

export function Confirm (data) {
  return request({
      url: apiPrefix + '/confirm',
      method: 'post',
      data: data
  })
}
