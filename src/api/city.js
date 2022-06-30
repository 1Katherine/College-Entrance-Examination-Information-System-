import request from '@/utils/request'

export function getAllCities() {
  return request({
    url: '',
    method: 'get'
  })
}

// 根据区域查询所有省份
export function getCityByProvince(provinceCode) {
  return request({
    url: `/geo/city/listAll/${provinceCode}`,
    method: 'get'
  })
}
