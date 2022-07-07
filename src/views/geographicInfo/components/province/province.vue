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
        >新增省份</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :data="provinceList" border="" :default-sort="{prop: 'province_region_name', order: 'descending'}">
        <el-table-column label="序号" type="index" width="100" />
        <!-- <el-table-column prop="province_code" label="省份编号" width="200" /> -->
        <el-table-column prop="province_region_name" label="所属区域" width="300" sortable />
        <el-table-column prop="province_name" label="省份" width="300" />
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
      <AddProvince
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
import { getProvincesByPage, addProvince, editProvince, delProvince } from '@/api/province'
import AddProvince from './add-province.vue'
export default {
  name: 'Province',
  components: {
    AddProvince
  },
  props: {
    allregions: {
      type: Array,
      default: null
    }
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
      provinceList: [],
      titleName: '',
      showDialog: false,
      form: { },
      regionObj: {}
    }
  },

  created() {
    this.getProvincesByPage()
  },
  methods: {
    async getProvincesByPage() { // 根据页码获取当前所有数据
      try {
        const { data } = await getProvincesByPage(this.page)
        this.page.total = data.data.total
        this.provinceList = data.data.records
        this.getRegionObj(this.allregions)
        for (var i = 0; i < this.provinceList.length; i++) {
          this.provinceList[i].province_region_name = this.regionObj[this.provinceList[i].province_region]
        }
      } catch (err) {
        console.log(err)
      }
    },
    getRegionObj(allregions) {
      for (var i = 0; i < allregions.length; i++) {
        this.regionObj[allregions[i].region_code] = allregions[i].region_name
      }
    },
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage // 修改当前页
      this.getProvincesByPage() // 获取当前页的数据给datalist
    },
    // 关闭新增/删除数据对话框
    cancelDialog(value) {
      this.showDialog = value
    },
    handleClick(row) {
      if (row.province_code) {
        this.titleName = '编辑省份信息'
        this.form = JSON.parse(JSON.stringify(row)) // 深拷贝，避免form变化时导致row也变化
      } else {
        this.titleName = '新增省份信息'
        this.form = { province_code: '', province_name: '' } // 解决vue响应式导致的，el-select显示不更新问题
      }
      this.showDialog = true
    },
    // 提交表单数据
    async submitInfo(value) {
      try {
        if (value.type === 'add') {
          console.log('add')
          await addProvince(this.form)
        } else {
          console.log('edit')
          await editProvince(this.form)
        }
      } catch (err) {
        console.log(err)
      }
      // 告诉父组件，重新获取新的所有省份
      this.$emit('getAllProvinces')
      // 刷新数据
      this.getProvincesByPage()
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
        await delProvince(row.province_code)
        this.$message({
          type: 'success',
          message: '删除数据成功'
        })
        // 告诉父组件，重新获取新的所有省份
        this.$emit('getAllProvinces')
        // 刷新数据
        this.getProvincesByPage()
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
