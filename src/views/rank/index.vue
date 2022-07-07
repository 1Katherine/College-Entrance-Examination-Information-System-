<template>

  <div class="dashboard-container">
    <div class="app-container">
      <h2 style="color:rgba(0,0,0,.65)">大学排行榜</h2>
      <el-card style="width:80%">
        <el-tabs v-model="activeName">
          <!-- 显示所有地理信息 -->
          <el-tab-pane label="软科" name="first">
            <info />
          </el-tab-pane>
          <el-tab-pane label="校友会" name="second" />
          <el-tab-pane label="武书连" name="third" />
          <el-tab-pane label="US" name="fourth" />
          <el-tab-pane label="QS" name="fifth" />
          <el-tab-pane label="泰晤士" name="sixth" />
        </el-tabs>
      </el-card>

    </div>
  </div>
</template>

<script>
import Info from './info.vue'
export default {
  components: {
    Info
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style>

</style>
