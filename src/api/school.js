import request from '@/utils/request'

// 查询所有学校信息
export function getSchoolList(data) {
  return request({
    url: '/school/listAll',
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
