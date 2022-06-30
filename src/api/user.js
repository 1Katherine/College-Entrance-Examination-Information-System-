import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserById(uid) {
  return request({
    url: `/user/${uid}`,
    method: 'get'
  })
}

export function logout() {

}

export function getAllUsers(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}
