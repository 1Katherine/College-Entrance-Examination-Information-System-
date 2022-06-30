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

