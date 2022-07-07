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
        >新增城市信息</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table v-loading="loading" :data="cityList" border="" :default-sort="{prop: 'city_province_name', order: 'descending'}">
        <el-table-column label="序号" type="index" width="100" />
        <!-- <el-table-column prop="city_code" label="城市编号" width="200" /> -->
        <el-table-column prop="city_province_name" label="所属省份" width="300" sortable />
        <el-table-column prop="city_name" label="城市名称" width="300" />
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
      <AddCity
        :show-dialog.sync="showDialog"
        :title-name="titleName"
        :allprovinces_total="allprovinces_total"
        :form="form"
        @submitInfo="submitInfo"
        @cancelDialog="cancelDialog"
      />
    </div>
  </div>

</template>

<script>
import { getCitiesByPage, addCity, editCity, delCity } from '@/api/city'
import AddCity from './add-city.vue'
export default {
  name: 'City',

  components: {
    AddCity
  },
  props: {
    allprovinces: {
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
      cityList: [],
      titleName: '',
      showDialog: false,
      form: { },
      provinceObj: {}, // 存储所有省份对象：key=省份code，value=省份名称
      allprovinces_total: [],
      loading: false // 表单加载
    }
  },
  watch: {
    // newValue 新数据（本次父组件传递的数据）
    // oldValue 旧数据（上一次父组件传递的数据）
    allprovinces(newValue, oldValue) {
      if (newValue) {
        this.getCitiesByPage()
        this.allprovinces_total = newValue
        this.loading = false // 数据获取完毕，关闭表单加载
      }
    }
  },
  methods: {
    async getCitiesByPage() { // 根据页码获取当前所有数据
      try {
        this.loading = true
        const { data } = await getCitiesByPage(this.page)
        this.page.total = data.data.total
        this.cityList = data.data.records
        this.getProvinceObj(this.allprovinces)
        for (var i = 0; i < this.cityList.length; i++) {
          this.cityList[i].city_province_name = this.provinceObj[this.cityList[i].city_province]
        }
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    getProvinceObj(allprovinces) {
      for (var i = 0; i < allprovinces.length; i++) {
        this.provinceObj[allprovinces[i].province_code] = allprovinces[i].province_name
      }
    },
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage // 修改当前页
      this.getCitiesByPage() // 获取当前页的数据给datalist
    },
    // 关闭新增/删除数据对话框
    cancelDialog(value) {
      this.showDialog = value
    },
    handleClick(row) {
      if (row.city_code) {
        this.titleName = '编辑城市信息'
        this.form = JSON.parse(JSON.stringify(row)) // 深拷贝，避免form变化时导致row也变化
      } else {
        this.titleName = '新增城市信息'
        this.form = { city_code: '', city_name: '' } // 解决vue响应式导致的，el-select显示不更新问题
      }
      this.showDialog = true
    },
    // 提交表单数据
    async submitInfo(value) {
      try {
        if (value.type === 'add') {
          console.log('add')
          await addCity(this.form)
        } else {
          console.log('edit')
          await editCity(this.form)
        }
      } catch (err) {
        console.log(err)
      }
      this.getCitiesByPage()
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
        await delCity(row.city_code)
        this.$message({
          type: 'success',
          message: '删除数据成功'
        })
        this.getCitiesByPage() // 刷新数据
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
