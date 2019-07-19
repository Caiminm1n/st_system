import request from '@/utils/request'

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}
export function logout () {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}
export function getUserInfo (token) {
  let query = {
    token: token
  }
  return request({
    url: '/auth/info',
    method: 'get',
    params: query
  })
}
