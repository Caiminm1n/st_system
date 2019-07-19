import request from '@/utils/request'

export function changePassword(data) {
  return request({
    url: '/password/password',
    method: 'post',
    data
  })
}
