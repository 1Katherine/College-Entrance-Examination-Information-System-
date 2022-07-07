// 学科门类接口信息
import request from '@/utils/request'

// 根据页码获取对应数据
export function getDisciplinesByPage(data) {
  return request({
    url: '/discipline/list',
    method: 'post',
    data
  })
}

// 获取所有数据
export function getAllDisciplines() {
  return request({
    url: '/discipline/listAll',
    method: 'post'
  })
}

// 新增双一流信息
export function addDiscipline(data) {
  return request({
    url: '/discipline/add',
    method: 'post',
    data
  })
}

// 编辑双一流信息
export function editDiscipline(data) {
  return request({
    url: '/discipline/update',
    method: 'post',
    data
  })
}

// 删除双一流信息
export function delDiscipline(disciplineCode) {
  return request({
    url: `/discipline/delete/${disciplineCode}`,
    method: 'delete'
  })
}
