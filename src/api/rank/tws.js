// 泰晤士排名
import request from '@/utils/request'

// 根据页码获取对应数据
export function getTwssByPage(data) {
  return request({
    url: '/rank/tws/list',
    method: 'post',
    data
  })
}

// 新增信息
export function addTws(data) {
  return request({
    url: '/rank/tws/add',
    method: 'post',
    data
  })
}

// 编辑信息
export function editTws(data) {
  return request({
    url: '/rank/tws/update',
    method: 'post',
    data
  })
}

// 删除信息
export function delTws(twsCode) {
  return request({
    url: `/rank/tws/delete/${twsCode}`,
    method: 'delete'
  })
}
