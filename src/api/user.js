import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/user-center/api/system/user/current',
    method: 'get'
  })
}

export function getRoutes() {
  return request({
    url: '/user-center/api/system/menu/routes',
    method: 'get'
  })
}
