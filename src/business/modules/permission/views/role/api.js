import { request } from '@/api/service'
const apiPrefix = '/auth.role'
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

/**
 * 获取角色权限资源
 * @param roleId
 * @returns {*}
 * @constructor
 */
export function GetPermission (roleId) {
  return request({
    url: apiPrefix + '/getPermission',
    method: 'post',
    data: { roleId }
  })
}

/**
 * 授权
 * @param roleId
 * @param resourceIds
 * @returns {*}
 * @constructor
 */
export function DoAuthz (roleId, resourceIds) {
  return request({
    url: apiPrefix + '/authz',
    method: 'post',
    data: {menu_ids:resourceIds,roleId:roleId}
  })
}
