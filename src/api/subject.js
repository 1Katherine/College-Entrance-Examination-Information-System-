// 一级学科接口
import request from '@/utils/request'

// 根据页码获取对应数据
export function getSubjectsByPage(data) {
  return request({
    url: '/subject/list',
    method: 'post',
    data
  })
}

// 新增信息
export function addSubject(data) {
  return request({
    url: '/subject/add',
    method: 'post',
    data
  })
}

// 编辑信息
export function editSubject(data) {
  return request({
    url: '/subject/update',
    method: 'post',
    data
  })
}

// 删除信息
export function delSubject(subjectCode) {
  return request({
    url: `/subject/delete/${subjectCode}`,
    method: 'delete'
  })
}
