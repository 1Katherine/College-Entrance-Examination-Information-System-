// 招生类型接口信息
import request from '@/utils/request'

// 根据页码获取对应数据
export function getZslxByPage(data) {
  return request({
    url: '/zslx/list',
    method: 'post',
    data
  })
}

// 新增信息
export function addZslx(data) {
  return request({
    url: '/zslx/add',
    method: 'post',
    data
  })
}

// 编辑信息
export function editZslx(data) {
  return request({
    url: '/zslx/update',
    method: 'post',
    data
  })
}

// 删除信息
export function delZslx(zslx_code) {
  return request({
    url: `/zslx/del/${zslx_code}`,
    method: 'delete'
  })
}
