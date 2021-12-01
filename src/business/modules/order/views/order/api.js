import { request } from '@/api/service'
const apiPrefix = '/order.order'
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

export function Delivery (data) {
    return request({
        url: apiPrefix + '/delivery',
        method: 'post',
        data: { data }
    })
}