// 双高计划高校接口信息
import request from '@/utils/request'

// 根据页码获取对应数据
export function getShuanggaoByPage(data) {
  return request({
    url: '/plan/sg/list',
    method: 'post',
    data
  })
}

// 新增双高计划信息
export function addShuanggao(data) {
  return request({
    url: '/plan/sg/add',
    method: 'post',
    data
  })
}

// 编辑双高计划信息
export function editShuanggao(data) {
  return request({
    url: '/plan/sg/update',
    method: 'post',
    data
  })
}

// 删除双高计划信息
export function delShuanggao(sgCode) {
  return request({
    url: `/plan/sg/delete/${sgCode}`,
    method: 'delete'
  })
}
