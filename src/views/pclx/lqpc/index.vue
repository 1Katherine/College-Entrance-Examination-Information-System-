<template>

  <div class="dashboard-container">
    <div class="app-container">
      <h2>录取批次</h2>
      <!-- 使用 PageTools 公共组件实现通用栏 -->
      <page-tools :show-before="true">
        <template slot="before">
          <!-- 新增学校信息按钮 -->
          <el-button
            type="primary"
            @click="handleClick"
          >新增录取批次</el-button>
        </template>
        <template slot="after">
          <el-button
            type="warning"
          >导入</el-button>
          <el-button type="danger">导出</el-button>
        </template>
      </page-tools>

      <!-- table组件展示数据 -->
      <Table :data-list="dataList" />
      <!-- 对话框组件 -->
    </div>
  </div>
</template>

<script>
import { getLqpcByPage } from '@/api/lqpc'
import Table from '@/components/common/table.vue'
export default {
  components: {
    Table
  },
  data() {
    return {
      // 表格
      dataList: [],

      // 分页
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created() {
    this.getLqpcByPage()
  },
  methods: {
    // 分页查询所有批次信息
    async getLqpcByPage() {
      try {
        const { data } = await getLqpcByPage(this.page)
        this.dataList = data.data
      } catch (err) {
        console.log(err)
      }
    },
    // 换页操作
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage
      //   重新获取数据
      this.getLqpcByPage()
    }
  }

}
</script>

<style>

</style>
