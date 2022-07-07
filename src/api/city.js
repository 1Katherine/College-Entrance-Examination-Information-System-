import request from '@/utils/request'

// export function getAllCities() {
//   return request({
//     url: '',
//     method: 'get'
//   })
// }

// 根据省份查询城市
export function getCityByProvince(provinceCode) {
  return request({
    url: `/geo/city/listAll/${provinceCode}`,
    method: 'get'
  })
}

// 分页获取城市信息
export function getCitiesByPage(data) {
  return request({
    url: '/geo/city/list',
    method: 'post',
    data
  })
}

// 新增城市
export function addCity(data) {
  return request({
    url: '/geo/city/add',
    method: 'post',
    data
  })
}

// 编辑城市
export function editCity(data) {
  return request({
    url: '/geo/city/update',
    method: 'post',
    data
  })
}

// 删除城市
export function delCity(cityCode) {
  return request({
    url: `/geo/city/delete/${cityCode}`,
    method: 'delete'
  })
}
