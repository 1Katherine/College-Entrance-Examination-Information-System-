// US排名
import request from '@/utils/request'

// 根据页码获取对应数据
export function getUssByPage(data) {
  return request({
    url: '/rank/us/list',
    method: 'post',
    data
  })
}

// 新增信息
export function addUs(data) {
  return request({
    url: '/rank/us/add',
    method: 'post',
    data
  })
}

// 编辑信息
export function editUs(data) {
  return request({
    url: '/rank/us/update',
    method: 'post',
    data
  })
}

// 删除信息
export function delUs(usCode) {
  return request({
    url: `/rank/us/delete/${usCode}`,
    method: 'delete'
  })
}
