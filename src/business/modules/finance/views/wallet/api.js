import { request } from '@/api/service'
const apiPrefix = '/wallet.wallet'
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
    url: apiPrefix + '/edit',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: apiPrefix + '/del',
    method: 'post',
    data: { id : id }
  })
}