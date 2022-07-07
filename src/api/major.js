// 专业接口
// 一级学科接口
import request from '@/utils/request'

// 根据页码获取对应数据
export function getMajorsByPage(data) {
  return request({
    url: '/major/list',
    method: 'post',
    data
  })
}

// 新增信息
export function addMajor(data) {
  return request({
    url: '/major/add',
    method: 'post',
    data
  })
}

// 编辑信息
export function editMajor(data) {
  return request({
    url: '/major/update',
    method: 'post',
    data
  })
}

// 删除信息
export function delMajor(majorCode) {
  return request({
    url: `/major/delete/${majorCode}`,
    method: 'delete'
  })
}
