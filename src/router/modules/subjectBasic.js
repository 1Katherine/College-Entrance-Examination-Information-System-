// 批次、招生类型
import Layout from '@/layout'

export default {
  path: '/subjectBasic',
  name: 'subjectBasic',
  component: Layout, // 每个模块都属于Layout的子模块
  meta: {
    title: '学科信息管理',
    icon: 'other'
  },
  children: [
    {
      path: 'discipline',
      component: () => import('@/views/subjectBasic/discipline'),
      meta: {
        title: '学科门类',
        icon: 'discipline'
      }
    },
    {
      path: 'subject',
      component: () => import('@/views/subjectBasic/subject'),
      meta: {
        title: '一级学科',
        icon: 'subject'
      }
    },
    {
      path: 'major',
      component: () => import('@/views/subjectBasic/major'),
      meta: {
        title: '专业信息',
        icon: 'major'
      }
    }
  ]
}
