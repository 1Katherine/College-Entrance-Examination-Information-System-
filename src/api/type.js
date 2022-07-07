// 学科门类接口
import request from '@/utils/request'

// 分页查询所有学科门类
export function getTypeByPage(data) {
  return request({
    url: '/discipline/list',
    method: 'post',
    data
  })
}

// 新增学科门类
export function addType(data) {
  return request({
    url: '/discipline/add',
    method: 'post',
    data
  })
}

// 修改学科门类
export function editType(data) {
  return request({
    url: '/discipline/update',
    method: 'post',
    data
  })
}

// 删除学科门类
export function delType(disciplineCode) {
  return request({
    url: `/discipline/delete/${disciplineCode}`,
    method: 'delete'
  })
}
