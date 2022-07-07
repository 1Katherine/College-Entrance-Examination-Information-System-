// 双一流高校接口信息
import request from '@/utils/request'

// 根据页码获取对应数据
export function getDualsByPage(data) {
  return request({
    url: '/plan/dual/list',
    method: 'post',
    data
  })
}

// 新增双一流信息
export function addDual(data) {
  return request({
    url: '/plan/dual/add',
    method: 'post',
    data
  })
}

// 编辑双一流信息
export function editDual(data) {
  return request({
    url: '/plan/dual/update',
    method: 'post',
    data
  })
}

// 删除双一流信息
export function delDual(dualCode) {
  return request({
    url: `/plan/dual/delete/${dualCode}`,
    method: 'delete'
  })
}
