import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/authorization-server/oauth/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic dGVzdF9jbGllbnQ6Tmljcm9uMTk5OA=='
    },
    data: {
      username: data.username,
      password: data.password,
      grant_type: 'password',
      scope: 'read',
      client_id: 'test_client',
      client_secret: 'Nicron1998'
    },
    transformRequest: [
      function(data) {
        let ret = ''
        for (const it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ]
  })
}
