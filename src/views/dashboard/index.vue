<!--
 * @Author: Yang
 * @Date: 2022-06-18 12:19:35
 * @LastEditors: Yang
 * @LastEditTime: 2022-06-18 23:33:15
 * @Description: file content
-->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div style="font-size:20px">
        <h4>已完成功能</h4>
        <ul>
          <li>右上角用户登出：返回登录页面</li>
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
