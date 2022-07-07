import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 用户注册
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 根据用户id获取用户信息
export function getUserById(uid) {
  return request({
    url: `/user/${uid}`,
    method: 'get'
  })
}

export function logout() {

}

// 获取所有用户信息
export function getAllUsers(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

// 删除用户
export function delUser(uid) {
  return request({
    url: `/user/delete/${uid}`,
    method: 'delete'
  })
}

// 编辑用户
export function editUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
