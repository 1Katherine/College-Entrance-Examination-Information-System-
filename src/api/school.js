import request from '@/utils/request'

// 分页查询所有学校信息
export function getSchoolListByPage(data) {
  return request({
    url: '/school/listByPage',
    method: 'post',
    data
  })
}

// 查询所有学校信息
export function getAllSchoolList(data) {
  return request({
    url: '/school/listAll',
    method: 'post',
    data
  })
}

// 根据条件查询学校信息
export function getSchoolListBySearch(data) {
  return request({
    url: '/school/list',
    method: 'post',
    data
  })
}

// 新增学校信息
export function addSchoolInfo(data) {
  return request({
    url: '/school/add',
    method: 'post',
    data
  })
}

// 修改学校信息
export function editSchoolInfo(data) {
  return request({
    url: '/school/update',
    method: 'post',
    data
  })
}
