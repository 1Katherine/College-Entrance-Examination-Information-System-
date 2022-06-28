/*
 * @Author: Yang
 * @Date: 2022-06-18 17:32:20
 * @LastEditors: Yang
 * @LastEditTime: 2022-06-18 17:56:40
 * @Description: file content
 */

// 导出学校招生信息模块的路由规则
import Layout from '@/layout'

export default {
  path: '/subjectAdmissions',
  name: 'subjectAdmissions',
  component: Layout, // 每个模块都属于Layout的子模块
  children: [
    {
      // 配置二级路由表
      path: '', // 当二级路由path为空时，表示该路由为当前二级路由的默认路由
      component: () => import('@/views/subjectAdmissions'),
      meta: {
        title: '学校专业招生信息', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'school'
      }
    }
  ]
}

// 当你的访问地址 是 /employees的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示
