<!--
 * @Author: Yang
 * @Date: 2022-06-18 17:31:12
 * @LastEditors: Yang
 * @LastEditTime: 2022-06-28 15:05:20
 * @Description: file content
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 使用 PageTools 公共组件实现通用栏 -->
      <page-tools :show-before="true">
        <template slot="before">
          <!-- 新增学校信息按钮 -->
          <el-button
            type="primary"
            @click="handleClick"
          >新增学校信息</el-button>
        </template>
        <template slot="after">
          <el-button
            type="warning"
            @click="$router.push('/import')"
          >导入</el-button>
          <el-button type="danger" @click="exportData">导出</el-button>
        </template>
      </page-tools>

      <!-- 搜索框div -->
      <div class="search">
        <el-select v-model="searchData.school_region" placeholder="请选择区域" clearable @change="changeRegion">
          <el-option
            v-for="item in regions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          /></el-select>
        <el-select v-model="searchData.school_province" placeholder="请选择省份" clearable @change="changeProvince" @focus="provinceFocus">
          <el-option
            v-for="item in province"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          /></el-select>
        <el-select v-model="searchData.school_city" placeholder="请选择城市" clearable @focus="cityFocus">
          <el-option
            v-for="item in city"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          /></el-select>
        <el-select v-model="searchData.school_level" placeholder="请选择学校等级" clearable>
          <el-option
            v-for="item in level"
            :key="item"
            :label="item"
            :value="item"
          /></el-select>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button icon="el-icon-refresh-right" @click="refesh">重置</el-button>
      </div>

      <!-- 信息显示表格 -->
      <el-card>
        <el-table :data="datalist" style="width: 100%" stripe border>
          <el-table-column prop="school_code" label="学校编号" width="100" />
          <el-table-column prop="school_id" label="学校id" width="140" />
          <!-- <el-table-column label="学校名" width="140">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.school_name }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="school_name" label="学校名" width="140" />
          <el-table-column prop="school_level" label="等级" width="100" />
          <el-table-column prop="school_type" label="类型" width="140" />
          <el-table-column prop="school_nature" label="办学性质" width="140" />
          <el-table-column prop="school_region" label="区域" width="100" />
          <el-table-column prop="school_province" label="省份" width="100" />
          <el-table-column prop="school_city" label="城市" width="100" />
          <el-table-column prop="school_belong" label="隶属单位" width="100" />
          <el-table-column prop="school_rk" label="最新软科排名" width="80" />
          <el-table-column
            prop="school_wsl"
            label="最新校友会排名"
            width="80"
          />
          <el-table-column
            prop="school_xyh"
            label="最新武书连排名"
            width="80"
          />
          <el-table-column prop="school_qs" label="最新QS排名" width="80" />
          <el-table-column prop="school_us" label="最新US排名" width="80" />
          <el-table-column
            prop="school_tws"
            label="最新泰晤士排名"
            width="80"
          />
          <el-table-column
            prop="school_requirments"
            label="报考要求"
            width="140"
          />
          <el-table-column width="200px" label="操作">
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
      </el-card>
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

      <!-- 新增招生信息的弹框组件 -->
      <add-school-info
        :show-dialog.sync="showDialog"
        :title-name="titleName"
        :form="form"
        @submitSchoolInfo="submitSchoolInfo"
        @cancelDialog="cancelDialog"
      />
    </div>
  </div>
</template>

<script>
import AddSchoolInfo from './add-schoolInfo.vue'
import { getSchoolList } from '@/api/school'
import { getAllRegions } from '@/api/region'
import { getProvinceByRegion } from '@/api/province'
import { getCityByProvince } from '@/api/city'
export default {
  name: 'SchoolInfo',
  components: {
    AddSchoolInfo
  },
  data() {
    return {
      // 接收表格数据（在mounted中，获取数据，同时计算数据总数
      datalist: [],
      // 分页相关数据
      page: {
        currentPage: 1, // 当前页数
        pageSize: 5, // 每一页放的数据个数
        total: 0 // 数据总数，需要在所有数据挂载完毕后才能在mounted中计算数据总数，
      },
      titleName: '新增',
      showDialog: false, // 新增招生信息弹出框是否显示
      regions: [], // 根据区域信息表得到的所有区域
      province: [], // 根据省份信息表得到的所有省份
      city: [], // 根据城市信息表得到的所有城市
      level: ['211', '985', '其他'], // 固定为211，985和其他
      searchData: {
        school_region: '',
        school_province: '',
        school_city: '',
        school_level: '',
        school_type: '',
        school_nature: '',
        school_211or985: '',
        school_belong: ''
      },
      // 传递给子组件的数据（新增学校表单和编辑学校表单
      form: {}
    }
  },
  async created() {
    await this.getSchoolList() // 获取所有数据
    await this.getAllRegions() // 获取地理位置
  },
  methods: {
    // 获取地理位置（区域、省份、城市）
    async getAllRegions() {
      const { data } = await getAllRegions(this.page)
      const regionsObj = data.data
      const regionsArr = []
      regionsObj.map(function(item, index, array) {
        const r = { 'value': item['region_code'],
          'label': item['region_name']
        }
        regionsArr.push(r)
      })
      this.regions = regionsArr
    },
    async provinceFocus() {
      const rid = this.searchData.school_region
      if (rid === '') {
        this.$message.warning('请先选择区域，再选择省份')
      } else {
        try {
          const { data } = await getProvinceByRegion(rid)
          const provinceObj = data.data
          const provinceArr = []
          provinceObj.map(function(item, index, array) {
            const pro = { 'value': item['province_code'],
              'label': item['province_name']
            }
            provinceArr.push(pro)
          })
          this.province = provinceArr
        } catch (error) {
          this.$message.warning(error)
        }
      }
    },
    async cityFocus() {
      const pid = this.searchData.school_province
      console.log('pid', pid)
      if (pid === '') {
        this.$message.warning('请先选择省份，再选择城市')
      } else {
        try {
          const { data } = await getCityByProvince(pid)
          const cityObj = data.data
          const cityArr = []
          cityObj.map(function(item, index, array) {
            const city = { 'value': item['city_code'],
              'label': item['city_name']
            }
            cityArr.push(city)
          })
          this.city = cityArr
        } catch (error) {
          this.$message.warning(error)
        }
      }
    },
    changeRegion() {
      this.searchData.school_province = ''
      this.searchData.school_city = ''
      this.searchData.school_211or985 = ''
    },
    changeProvince() {
      this.searchData.school_city = ''
      this.searchData.school_211or985 = ''
    },
    async getSchoolList() { // 根据页码获取当前所有数据
      const { data } = await getSchoolList(this.page)
      this.page.total = data.data.total
      this.datalist = data.data.records
    },
    handleClick(row) {
      console.log(row.school_name)

      if (row.school_name) {
        this.titleName = '编辑学校信息'
        this.form = JSON.parse(JSON.stringify(row)) // 深拷贝，避免form变化时导致row也变化
      } else {
        this.titleName = '新增学校信息'
      }
      this.showDialog = true
      // 把学校id传递给子组件，子组件调用查询按钮，查询出该学校的所有数据，用于数据回显
      // console.log(row) // 点击编辑按钮，获取当前行的数据
    },
    submitSchoolInfo(value) {
      if (value.type === 'add') {
        console.log('add')
        console.log(value.data)
      } else {
        // value.type === 'edit'
        console.log('edit')
        console.log(value.data)
      }
    },
    handleDelete(row) {
    },
    // 关闭新增数据窗口
    cancelDialog(value) {
      this.showDialog = value
      this.form = {} // 关闭form将表单置为空
    },
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage // 修改当前页
      this.getSchoolList() // 获取当前页的数据给datalist
    },
    refesh() {
      this.searchData = {
        school_region: '',
        school_province: '',
        school_city: '',
        school_level: '',
        school_type: '',
        school_nature: '',
        school_211or985: '',
        school_belong: ''
      }
    },
    // 导出表格方法
    exportData() {
      // 表头对应关系
      const headers = {
        学校编号: 'school_id',
        学校名: 'school_name',
        学校等级: 'school_level',
        学校类型: 'school_type',
        办学性质: 'school_nature',
        区域: 'school_region',
        省份: 'school_province',
        城市: 'school_city',
        是否211: 'school_211',
        是否985: 'school_985',
        隶属单位: 'school_belong',
        最新软科排名: 'school_rk',
        最新校友会排名: 'school_xyh',
        最新武书连排名: 'school_wsl',
        最新QS排名: 'school_qs',
        最新US排名: 'school_us',
        最新泰晤士排名: 'school_tws',
        报考要求: 'school_requirments'
      }
      var mydata = []
      for (var i = 0; i < this.datalist.length; i++) {
        mydata.push(Object.values(this.datalist[i]))
      }
      console.log(mydata)
      // 懒加载
      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data: mydata,
          filename: '学校信息表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  margin: 0px 0px 10px 0px;
  display: flex;
  justify-content: flex-start;
  .el-select {
    margin-right: 20px;
  }
}
</style>
