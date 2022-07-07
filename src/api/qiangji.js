// 强基计划高校接口信息
import request from '@/utils/request'

// 根据页码获取对应数据
export function getQiangJiByPage(data) {
  return request({
    url: '/plan/qj/list',
    method: 'post',
    data
  })
}

// 新增强基计划信息
export function addQiangJi(data) {
  return request({
    url: '/plan/qj/add',
    method: 'post',
    data
  })
}

// 编辑强基计划信息
export function editQiangJi(data) {
  return request({
    url: '/plan/qj/update',
    method: 'post',
    data
  })
}

// 删除强基计划信息
export function delQiangJi(qjCode) {
  return request({
    url: `/plan/qj/delete/${qjCode}`,
    method: 'delete'
  })
}
