import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/user-center/api/system/role/list',
    method: 'get'
  })
}
