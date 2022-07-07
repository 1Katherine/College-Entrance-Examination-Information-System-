// 武书连排名
import request from '@/utils/request'

// 根据页码获取对应数据
export function getWslsByPage(data) {
  return request({
    url: '/rank/wsl/list',
    method: 'post',
    data
  })
}

// 新增信息
export function addWsl(data) {
  return request({
    url: '/rank/wsl/add',
    method: 'post',
    data
  })
}

// 编辑信息
export function editWsl(data) {
  return request({
    url: '/rank/wsl/update',
    method: 'post',
    data
  })
}

// 删除信息
export function delWsl(wslCode) {
  return request({
    url: `/rank/wsl/delete/${wslCode}`,
    method: 'delete'
  })
}
