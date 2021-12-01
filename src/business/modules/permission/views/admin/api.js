import { request } from '@/api/service'
const apiPrefix = '/auth.admin'
export function GetList (data) {
  return request({
    url: apiPrefix + '/list',
    method: 'post',
    data:data
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

export function GetObj (id) {
  return request({
    url: apiPrefix + '/info',
    method: 'get',
    params: { id }
  })
}

export function GetAuthzData () {
  return request({
    url: apiPrefix + '/getAuthzData',
    method: 'get'
  })
}

export function DoAuthz (userId, roleIds) {
  return request({
    url: apiPrefix + '/authz',
    method: 'post',
    data: {id:userId,roleIds:roleIds}
  })
}
