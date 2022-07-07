<template>
  <div>
    <el-row v-for="item in schools" :key="item.rank" type="flex" justify="space-between" align="middle">
      <!-- 左侧序号 -->
      <el-col :span="4">{{ item.rank }}</el-col>
      <!-- 中间学校 -->
      <el-col>
        <!-- 学校名称 -->
        <el-row>{{ item.school_name }}</el-row>
        <!-- 学校基本信息 -->
        <el-row style="padding-top:10px; font-size:16px; color:#555555">
          <el-tag>{{ item.school_level }}</el-tag>
          <el-tag>{{ item.school_type }}</el-tag>
          <el-tag>{{ item.school_nature }}</el-tag>
          <el-tag v-if="item.school_985">985</el-tag>
          <el-tag v-if="item.school_211">211</el-tag>
          <el-tag v-if="item.school_dual">双一流</el-tag>
          <el-tag v-if="item.school_sg">双高计划</el-tag>
          <el-tag v-if="item.school_qj">强基计划</el-tag>
        </el-row>
      </el-col>
      <!-- 右侧学校详情页面跳转按钮 -->
      <el-col :span="4"><el-button size="small">招生信息</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schools: [{
        rank: 1,
        school_name: '清华大学',
        school_level: '普通本科',
        school_type: '综合类',
        school_nature: '公办',
        school_211: 1,
        school_985: 1,
        school_dual: 1,
        school_qj: 1,
        school_sh: 0
      },
      {
        rank: 2,
        school_name: '北京大学',
        school_level: '普通本科',
        school_type: '综合类',
        school_nature: '公办',
        school_211: 1,
        school_985: 1,
        school_dual: 0,
        school_qj: 0,
        school_sh: 1
      }]
    }
  }

}
</script>

<style lang="scss" scoped>
.el-row--flex {
    padding: 8px;
    color: rgba(0,0,0,.65);
    .el-tag {
        margin-right: 10px;
        font-size: 14px;
    }
}
</style>

