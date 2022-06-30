import request from '@/utils/request'

export function getAllRegions() {
  return request({
    url: '/geo/region/listAll',
    method: 'get'
  })
}

