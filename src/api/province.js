import request from '@/utils/request'

export function getAllProvinces() {
  return request({
    url: '',
    method: 'get'
  })
}

// 根据区域查询所有省份
export function getProvinceByRegion(regionCode) {
  return request({
    url: `/geo/province/listAll/${regionCode}`,
    method: 'get'
  })
}

// 分页获取省份信息
export function getProvincesByPage(data) {
  return request({
    url: '/geo/province/list',
    method: 'post',
    data
  })
}

// 新增省份
export function addProvince(data) {
  return request({
    url: '/geo/province/add',
    method: 'post',
    data
  })
}

// 编辑省份
export function editProvince(data) {
  return request({
    url: '/geo/province/update',
    method: 'post',
    data
  })
}

// 删除省份
export function delProvince(provinceCode) {
  return request({
    url: `/geo/province/delete/${provinceCode}`,
    method: 'delete'
  })
}
