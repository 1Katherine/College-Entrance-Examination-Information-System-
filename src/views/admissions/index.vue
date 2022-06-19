<!--
 * @Author: Yang
 * @Date: 2022-06-18 17:31:12
 * @LastEditors: Yang
 * @LastEditTime: 2022-06-18 22:45:34
 * @Description: file content
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 新增学校信息按钮 -->
      <el-row style="height: 60px">
        <el-button size="small" type="primary" @click="dialogVisible = true"
          >新增招生信息</el-button
        >
      </el-row>
      <!-- 信息显示表格 -->
      <el-table :data="datalist" style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="学校" width="140"></el-table-column>
        <el-table-column prop="province" label="省份" width="80">
        </el-table-column>
        <el-table-column prop="major" label="专业" width="120">
        </el-table-column>
        <el-table-column prop="year" label="年份" width="80"> </el-table-column>
        <el-table-column prop="zsrs" label="招生人数" width="80">
        </el-table-column>
        <el-table-column prop="zslx" label="招生类型" width="100">
        </el-table-column>
        <el-table-column prop="zspc" label="招生批次" width="100">
        </el-table-column>
        <el-table-column prop="qjjh" label="是否有强基计划" width="80">
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row justify="center" type="flex" align="middle" style="height: 60px">
        <el-pagination layout="prev, pager, next" :total="1000">
        </el-pagination>
      </el-row>

      <!-- 新增招生信息的弹框表单页面 -->
      <el-dialog
        title="新增学校招生信息"
        :visible.sync="dialogVisible"
        :before-close="btnCancel"
      >
        <el-form label-width="120px" style="margin-top: 10px">
          <el-form-item label="学校名称">
            <el-select></el-select>
          </el-form-item>
          <el-form-item label="所属省份">
            <el-select></el-select>
          </el-form-item>
          <el-form-item label="招生专业">
            <el-select></el-select>
          </el-form-item>
          <el-form-item label="招生人数">
            <el-input style="width: 202px" />
          </el-form-item>
          <el-form-item label="招生类型">
            <el-select></el-select>
          </el-form-item>
          <el-form-item label="招生批次">
            <el-select></el-select>
          </el-form-item>
          <el-form-item label="是否有强基计划">
            <el-select></el-select>
          </el-form-item>
        </el-form>
        <!-- 弹框底部 -->
        <el-row type="flex" justify="center">
          <el-col :span="4">
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="primary" @click="btnOk"
              >确定</el-button
            >
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchoolAdmission',
  data() {
    return {
      datalist: [{
        name: "华中科技大学",
        province: "湖北",
        major: "计算机科学与技术",
        year: 2022,
        zsrs: 12,
        zslx: "本科",
        zspc: "本科一批",
        qjjh: "否"
      }, {
        name: "武汉大学",
        province: "湖北",
        major: "软件工程",
        year: 2022,
        zsrs: 2,
        zslx: "本科",
        zspc: "本科一批",
        qjjh: "否"
      },
      {
        name: "四川大学",
        province: "四川",
        major: "食品科学与工程",
        year: 2022,
        zsrs: 19,
        zslx: "本科",
        zspc: "本科一批",
        qjjh: "否"
      },
      {
        name: "国防科技大学",
        province: "四川",
        major: "计算机科学与技术",
        year: 2022,
        zsrs: 20,
        zslx: "本科",
        zspc: "本科一批",
        qjjh: "有"
      }],
      dialogVisible: false // 新增招生信息弹出框是否显示
    }
  },
  methods: {
    // 关闭新增学校招生信息的弹框
    btnCancel() {
      this.dialogVisible = false  // 关闭弹窗
    },
    btnOk() {
      this.dialogVisible = false  // 关闭弹窗
    }
  }

}
</script>

<style lang="scss" scoped>
.el-select {
  width: 300px !important;
}
.el-input {
  width: 300px !important;
}
</style>