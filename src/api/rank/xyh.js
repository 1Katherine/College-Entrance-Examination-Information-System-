// 校友会排名
import request from '@/utils/request'

// 根据页码获取对应数据
export function getXyhsByPage(data) {
  return request({
    url: '/rank/xyh/list',
    method: 'post',
    data
  })
}

// 新增信息
export function addXyh(data) {
  return request({
    url: '/rank/xyh/add',
    method: 'post',
    data
  })
}

// 编辑信息
export function editXyh(data) {
  return request({
    url: '/rank/xyh/update',
    method: 'post',
    data
  })
}

// 删除信息
export function delXyh(xyhCode) {
  return request({
    url: `/rank/xyh/delete/${xyhCode}`,
    method: 'delete'
  })
}
