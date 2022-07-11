import request from '@/utils/request'

// 分页查询所有学校信息
export function getSchoolListByPage(data) {
  return request({
    url: '/school/listByPage',
    method: 'post',
    data
  })
}

// 查询所有学校信息
export function getAllSchoolList(data) {
  return request({
    url: '/school/listAll',
    method: 'post',
    data
  })
}

// 根据条件查询学校信息
export function getSchoolListBySearch(data) {
  return request({
    url: '/school/list',
    method: 'post',
    data
  })
}

// 新增学校信息
export function addSchoolInfo(data) {
  return request({
    url: '/school/add',
    method: 'post',
    data
  })
}

// 修改学校信息
export function editSchoolInfo(data) {
  return request({
    url: '/school/update',
    method: 'post',
    data
  })
}

export function delSchoolInfo(schoolCode) {
  return request({
    url: `/school/delete/${schoolCode}`,
    method: 'delete'
  })
}

/** 学校门类信息 */
// 分页查询所有学校学科门类
export function getSchoolDisciplinesByPage(data) {
  return request({
    url: '/schoolDiscipline/list',
    method: 'post',
    data
  })
}

// 新增学校学科门类
export function addSchoolDiscipline(data) {
  return request({
    url: '/schoolDiscipline/add',
    method: 'post',
    data
  })
}

// 修改学校学科门类
export function editSchoolDiscipline(data) {
  return request({
    url: '/schoolDiscipline/update',
    method: 'post',
    data
  })
}

// 删除学校学科门类
export function delSchoolDiscipline(schoolDisciplineCode) {
  return request({
    url: `/schoolDiscipline/delete/${schoolDisciplineCode}`,
    method: 'delete'
  })
}

// 根据school_id查询某学校所有学科门类
export function getSchoolDisciplinesBySchoolId(schoolId) {
  return request({
    url: `/schoolDiscipline/listAll/${schoolId}`,
    method: 'post'
  })
}

/** 学校一级学科信息 */
// 分页查询所有学校一级学科接口
export function getSchoolSubjectsByPage(data) {
  return request({
    url: '/schoolSubject/list',
    method: 'post',
    data
  })
}

// 新增学校一级学科
export function addSchoolSubject(data) {
  return request({
    url: '/schoolSubject/add',
    method: 'post',
    data
  })
}

// 修改学校一级学科
export function editSchoolSubject(data) {
  return request({
    url: '/schoolSubject/update',
    method: 'post',
    data
  })
}

// 删除学校一级学科
export function delSchoolSubject(schoolSubjectCode) {
  return request({
    url: `/schoolSubject/delete/${schoolSubjectCode}`,
    method: 'delete'
  })
}

// 根据school_id查询某学校所有一级学科
export function getSchoolSubjectsBySchoolId(schoolId) {
  return request({
    url: `/schoolSubject/listAll/${schoolId}`,
    method: 'post'
  })
}

/** 学校专业信息 */

/** 学校招生信息 */

/** 学校录取分数信息 */
