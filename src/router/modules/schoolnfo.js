// 导出学校招生信息模块的路由规则
import Layout from '@/layout'

export default {
  path: '/schoolInfo',
  name: 'schoolInfo',
  component: Layout, // 每个模块都属于Layout的子模块
  meta: {
    title: '学校信息管理',
    icon: 'school'
  },
  children: [
    {
      // 配置二级路由表
      path: 'schoolInfo', // 当二级路由path为空时，表示该路由为当前二级路由的默认路由
      component: () => import('@/views/schoolInfo'),
      meta: {
        title: '学校基本信息', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'school'
      }
    },
    {
      // 配置二级路由表
      path: 'disciplineInfo', // 当二级路由path为空时，表示该路由为当前二级路由的默认路由
      // component: () => import('@/views/typeInfo'),
      meta: {
        title: '学校学科门类', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'discipline'
      }
    },
    {
      // 配置二级路由表
      path: 'subjectInfo', // 当二级路由path为空时，表示该路由为当前二级路由的默认路由
      // component: () => import('@/views/subjectInfo'),
      meta: {
        title: '学校一级学科', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'subject'
      }
    },
    {
      // 配置二级路由表
      path: 'majorInfo', // 当二级路由path为空时，表示该路由为当前二级路由的默认路由
      // component: () => import('@/views/schoolInfo'),
      meta: {
        title: '学校专业信息', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'major'
      }
    },
    {
      // 配置二级路由表
      path: 'admissionInfo', // 当二级路由path为空时，表示该路由为当前二级路由的默认路由
      // component: () => import('@/views/subjectAdmissions'),
      meta: {
        title: '学校招生信息', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'admission'
      }
    },
    {
      // 配置二级路由表
      path: 'scoreInfo', // 当二级路由path为空时，表示该路由为当前二级路由的默认路由
      // component: () => import('@/views/subjectScore'),
      meta: {
        title: '学校历年录取分数', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'score'
      }
    }

  ]
}
