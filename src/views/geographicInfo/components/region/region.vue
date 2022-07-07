<template>
  <div class="dashboard-container">
    <div class="app-container" style="padding-top:0">
      <!-- 新增信息按钮 -->
      <el-row style="height:40px">
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click="handleClick"
        >新增区域</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :data="regionList" border="">
        <el-table-column label="序号" type="index" width="100" />
        <!-- <el-table-column prop="region_code" label="编号" width="200" /> -->
        <el-table-column prop="region_name" label="区域" width="400" />
        <el-table-column label="操作">
          <!-- 通过作用域插槽，通过点击行，获得父组件行的数据 -->
          <template slot-scope="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="handleClick(row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row justify="center" type="flex" align="middle" style="height: 60px">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          :total="page.total"
          @current-change="handleCurrentChange"
        />
      </el-row>
      <AddRegion
        :show-dialog.sync="showDialog"
        :title-name="titleName"
        :form="form"
        @submitInfo="submitInfo"
        @cancelDialog="cancelDialog"
      />
    </div>
  </div>

</template>

<script>
import { getRegionsByPage, addRegion, editRegion, delRegion } from '@/api/region'
import AddRegion from './add-region.vue'
export default {
  name: 'Region',

  components: {
    AddRegion
  },
  data() {
    return {
      // 分页相关数据
      page: {
        currentPage: 1, // 当前页数
        pageSize: 10, // 每一页放的数据个数
        total: 0 // 数据总数，需要在所有数据挂载完毕后才能在mounted中计算数据总数，
      },
      // 表格数据
      regionList: [],
      titleName: '',
      showDialog: false,
      form: { }
    }
  },
  created() {
    this.getRegionsByPage()
  },
  methods: {
    async getRegionsByPage() { // 根据页码获取当前所有数据
      const { data } = await getRegionsByPage(this.page)
      this.page.total = data.data.total
      this.regionList = data.data.records
    },
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage // 修改当前页
      this.getRegionsByPage() // 获取当前页的数据给datalist
    },
    // 关闭新增/删除数据对话框
    cancelDialog(value) {
      this.showDialog = value
    },
    handleClick(row) {
      if (row.region_code) {
        this.titleName = '编辑区域信息'
        this.form = JSON.parse(JSON.stringify(row)) // 深拷贝，避免form变化时导致row也变化
      } else {
        this.titleName = '新增区域信息'
        this.form = { region_code: '', region_name: '' } // 解决vue响应式导致的，el-select显示不更新问题
      }
      this.showDialog = true
    },
    // 提交表单数据
    async submitInfo(value) {
      try {
        if (value.type === 'add') {
          console.log('add')
          await addRegion(this.form) // 新增数据
        } else {
          console.log('edit')
          await editRegion(this.form) // 编辑数据
        }
      } catch (err) {
        console.log(err)
      }
      this.getRegionsByPage(this.page) // 刷新数据
    },
    // 删除数据
    handleDelete(row) {
      this.$prompt('请输入DELETE', '确认删除本行数据？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator(value) {
          return value === 'DELETE'
        },
        inputErrorMessage: '输入格式不正确，无法删除数据！'
      }).then(async() => {
        await delRegion(row.region_code)
        this.$message({
          type: 'success',
          message: '删除数据成功'
        })
        this.getRegionsByPage(this.page) // 刷新数据
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除操作'
        })
      })
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
