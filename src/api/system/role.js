import request from '@/utils/request'

/**
 * 获取角色分页
 * @param {分页信息} pageParam
 * @returns
 */
export function getRolePage(pageParam) {
  return request({
    url: '/user-center/api/system/role/page',
    method: 'get',
    params: pageParam
  })
}

export function getRoleInfo(roleId) {
  return request({
    url: '/user-center/api/system/role/' + roleId,
    method: 'get'
  })
}

export function updateRoleInfo(roleId, roleInfo) {
  return request({
    url: '/user-center/api/system/role/' + roleId,
    method: 'put',
    data: roleInfo
  })
}

export function getRoleList() {
  return request({
    url: '/user-center/api/system/role/list',
    method: 'get'
  })
}
