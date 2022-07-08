<template>

  <div class="dashboard-container">
    <div class="app-container">
      <!-- <h2 style="color:rgba(0,0,0,.65)">大学排行榜</h2> -->
      <el-card style="width:80%">
        <el-tabs v-model="activeName">
          <!-- 显示所有地理信息 -->
          <el-tab-pane label="软科" name="first">
            <RK />
          </el-tab-pane>
          <el-tab-pane label="校友会" name="second">
            <XYH />
          </el-tab-pane>
          <el-tab-pane label="武书连" name="third">
            <WSL />
          </el-tab-pane>
          <el-tab-pane label="US" name="fourth">
            <US />
          </el-tab-pane>
          <el-tab-pane label="QS" name="fifth">
            <QS />
          </el-tab-pane>
          <el-tab-pane label="泰晤士" name="sixth">
            <TWS />
          </el-tab-pane>
        </el-tabs>
      </el-card>

    </div>
  </div>
</template>

<script>
import RK from './rk'
import QS from './qs'
import US from './us'
import TWS from './tws'
import XYH from './xyh'
import WSL from './wsl'
export default {
  components: {
    RK, QS, US, XYH, TWS, WSL
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
