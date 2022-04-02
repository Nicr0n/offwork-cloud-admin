import request from '@/utils/request'

/**
 * 获取用户分页
 * @param {分页信息} pageParam
 * @returns
 */
export function getUserPage(pageParam) {
  return request({
    url: '/user-center/api/system/user/page',
    method: 'get',
    params: pageParam
  })
}

export function getUserInfo(userId) {
  return request({
    url: '/user-center/api/system/user/' + userId,
    method: 'get'
  })
}

export function updateUserInfo(userId, userInfo) {
  return request({
    url: '/user-center/api/system/user/' + userId,
    method: 'put',
    data: userInfo
  })
}
