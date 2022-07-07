// QS排名
import request from '@/utils/request'

// 根据页码获取对应数据
export function getQssByPage(data) {
  return request({
    url: '/rank/qs/list',
    method: 'post',
    data
  })
}

// 新增信息
export function addQs(data) {
  return request({
    url: '/rank/qs/add',
    method: 'post',
    data
  })
}

// 编辑信息
export function editQs(data) {
  return request({
    url: '/rank/qs/update',
    method: 'post',
    data
  })
}

// 删除信息
export function delQs(qsCode) {
  return request({
    url: `/rank/qs/delete/${qsCode}`,
    method: 'delete'
  })
}
