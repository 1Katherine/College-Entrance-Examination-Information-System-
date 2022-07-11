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
        <!-- 7-8 -->
        <span>今日待完成功能</span>
        <ol>
          <li>学校学科门类</li>
          <li>学校一级学科</li>
          <li>学校专业信息</li>
        </ol>

        <hr>
        <!-- 7-7 -->
        <h3>7-7 完成功能</h3>
        <ol>
          <li>搜索框建议：将目前使用下拉框来修改学校或选择学校的操作，改成输入框根据输入字符给出下拉建议或提示 ✔
            <ul>
              <li> 高校排行榜表单 ✔</li>
              <li> 特色院校表单 ✔ </li>
              <li> 学校信息表单 ✔</li>
            </ul>
          </li>
          <li>招生类型和批次管理 ✔</li>
          <li>排名信息管理 ✔</li>
          <li>
            改变左侧菜单栏布局："学科信息管理" ✔
            <ul>
              <li>学科门类 ✔</li>
              <li>一级学科 ✔</li>
              <li>专业信息 ✔</li>
            </ul>
          </li>
          <li>
            新增左侧菜单栏布局："学校信息管理" ✔
            <ul>
              <li>学校基本信息 ✔</li>
              <li>学校学科门类 ✔</li>
              <li>学校一级学科 ✔</li>
              <li>学校专业信息 ✔</li>
              <li>学校招生信息 ✔</li>
              <li>学校历年录取分数线 ✔</li>
            </ul>
          </li>
        </ol>
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
