// import router from '@/router' // 引入路由实例
// import store from '@/store' // 引入vuex实例
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css' // 引入进度条样式

// const whiteList = ['/login', '/404'] // 白名单页面

// // 路由前置守卫
// router.beforeEach(function(to, from, next) {
//   NProgress.start() // 开启进度条

//   // 判断是否有token
//   if (store.getters.token) {
//     // 判断是不是要去登录页
//     if (to.path === '/login') {
//       // 跳到主页（有token就不用再去登录了）
//       next('/')
//     } else { // 有token，并且是去其他页面 =》 直接放行
//       next()
//     }
//   } else { // 没有token
//     if (whiteList.indexOf(to.path) > -1) { // 要去白名单
//       next() // 白名单直接放行
//     } else {
//       next('/login') // 去登录
//     }
//   }
// })
