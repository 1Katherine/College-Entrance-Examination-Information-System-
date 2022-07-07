import request from '@/utils/request'

// 获取所有区域
export function getAllRegions() {
  return request({
    url: '/geo/region/listAll',
    method: 'get'
  })
}

// 分查获取区域( currentPage:"1", pageSize:"5")
export function getRegionsByPage(data) {
  return request({
    url: '/geo/region/list',
    method: 'post',
    data
  })
}

// 新增区域(region_name)
export function addRegion(data) {
  return request({
    url: '/geo/region/add',
    method: 'post',
    data
  })
}

// 编辑区域 "region_code":1,region_name":"华东"
export function editRegion(data) {
  return request({
    url: '/geo/region/update',
    method: 'post',
    data
  })
}

// 删除区域
export function delRegion(regionCode) {
  return request({
    url: `/geo/region/delete/${regionCode}`,
    method: 'delete'
  })
}
