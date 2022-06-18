const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token // 将token值作为公共的访问属性放出
}
export default getters
