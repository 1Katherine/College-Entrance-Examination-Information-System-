import { getToken, setToken, removeToken } from '@/utils/auth'

// 状态
const state = {
  // 初始化时候通过缓存获得token，并将token持久化到vuex
  token: getToken() // token的初始状态
}

// 修改状态方法
const mutations = {
  // 设置token状态的方法
  setToken(state, token) {
    state.token = token // 修改token状态的值

    setToken(token) // 将vuex中token的值存入缓存cookie中
  },
  // 删除缓存的方法
  removeToken(state) {
    state.token = null // 修改token状态的值

    removeToken() // 将vuex中token的值同步到缓存cookie中
  }
}

// 执行异步
const actions = {
  async login(context, data) {
    const result = await this.login(data) // 调用api中的登录请求方法

    if (result.data.success) {
      // 如果登录成功, 调用mutations中的setToken方法持久化token
      context.commit('setToken', result.data.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
