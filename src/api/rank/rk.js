// 软科排名
import request from '@/utils/request'

// 根据页码获取对应数据
export function getRksByPage(data) {
  return request({
    url: '/rank/rk/list',
    method: 'post',
    data
  })
}

// 新增信息
export function addRk(data) {
  return request({
    url: '/rank/rk/add',
    method: 'post',
    data
  })
}

// 编辑信息
export function editRk(data) {
  return request({
    url: '/rank/rk/update',
    method: 'post',
    data
  })
}

// 删除信息
export function delRk(rkCode) {
  return request({
    url: `/rank/rk/delete/${rkCode}`,
    method: 'delete'
  })
}
