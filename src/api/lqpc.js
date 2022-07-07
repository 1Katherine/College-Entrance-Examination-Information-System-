// 录取批次接口信息
import request from '@/utils/request'

// 根据页码获取对应数据
export function getLqpcByPage(data) {
  return request({
    url: '/pc/list',
    method: 'post',
    data
  })
}

// 新增信息
export function addLqpc(data) {
  return request({
    url: '/pc/add',
    method: 'post',
    data
  })
}

// 编辑信息
export function editLqpc(data) {
  return request({
    url: '/pc/update',
    method: 'post',
    data
  })
}

// 删除信息
export function delLqpc(pc_code) {
  return request({
    url: `/pc/del/${pc_code}`,
    method: 'delete'
  })
}
