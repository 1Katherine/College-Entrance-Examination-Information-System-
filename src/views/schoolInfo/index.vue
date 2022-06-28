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
          <el-button type="primary" @click="handleClick"
            >新增学校信息</el-button
          >
        </template>
        <template slot="after">
          <el-button type="warning" @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button type="danger" @click="exportData">导出</el-button>
        </template>
      </page-tools>
      <!-- 信息显示表格 -->
      <el-card>
        <el-table :data="datalist" style="width: 100%" stripe border>
          <el-table-column fixed="" type="index" label="序号" width="100" />
          <el-table-column prop="school_id" label="学校编号" width="140" />
          <el-table-column label="学校名" width="140">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.school_name }}</el-tag>
            </template>
          </el-table-column>
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
              <el-button size="small" type="primary" @click="handleClick(row)"
                >编辑</el-button
              >
              <el-button size="small" type="danger" @click="handleDelete(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 分页组件 -->
      <el-row justify="center" type="flex" align="middle" style="height: 60px">
        <el-pagination
          :current-page="page.page"
          :page-size="page.size"
          layout="prev, pager, next"
          :total="page.total"
          @current-change="handleCurrentChange"
        />
      </el-row>

      <!-- 新增招生信息的弹框组件 -->
      <add-school-info
        :show-dialog.sync="showDialog"
        :title-name="titleName"
        @cancelDialog="cancelDialog"
      />
    </div>
  </div>
</template>

<script>
import AddSchoolInfo from './add-schoolInfo.vue'
var data = {
  school_id: '10074',
  school_name: '华中科技大学',
  school_level: 'B',
  school_type: '本科一批',
  school_nature: '本科',
  school_region: '中部',
  school_province: '湖北',
  school_city: '武汉',
  school_211: 1,
  school_985: 1,
  school_belong: '湖北省',
  school_rk: 8,
  school_xyh: 12,
  school_wsl: 22,
  school_qs: 69,
  school_us: 178,
  school_tws: 7,
  school_requirments: '报考要求'
}
var data1 = {
  school_id: '20046',
  school_name: '武汉大学',
  school_level: 'B',
  school_type: '本科一批',
  school_nature: '本科',
  school_region: '中部',
  school_province: '湖北',
  school_city: '武汉',
  school_211: 1,
  school_985: 1,
  school_belong: '湖北省',
  school_rk: 9,
  school_xyh: 10,
  school_wsl: 80,
  school_qs: 99,
  school_us: 237,
  school_tws: 6,
  school_requirments: '报考要求'
}
var tableList = [
  data,
  data1,
  data,
  data1,
  data,
  data1,
  data,
  data1,
  data,
  data1,
  data,
  data1,
  data,
  data1,
  data,
  data1,
  data1,
  data,
  data1,
  data,
  data1
]
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
        page: 1, // 当前页数
        size: 10, // 每一页放的数据个数
        total: 0 // 数据总数，需要在所有数据挂载完毕后才能在mounted中计算数据总数，
      },
      titleName: '新增',
      showDialog: false, // 新增招生信息弹出框是否显示

    }
  },
  created() {
    this.getSchoolList() // 获取所有数据
  },
  methods: {
    // getSchoolList() { // 根据页码获取当前所有数据
    //   const { total, rows } = await getEmployeeList(this.page)
    //   this.page.total = total
    //   this.datalist = rows
    // }
    getSchoolList() { // 根据页码获取当前所有数据
      this.page.total = tableList.length // 修改分页组件的总数居数量
      this.datalist = tableList.slice((this.page.page - 1) * this.page.size,
        this.page.page * this.page.size) // 为表格附上第一页的数据
    },
    handleClick(row) {
      this.showDialog = true // 弹出新增数据对话框
      if (row.school_name) {
        this.titleName = '编辑学校信息'

      } else {
        this.titleName = '新增学校信息'
      }
      // 把学校id传递给子组件，子组件调用查询按钮，查询出该学校的所有数据，用于数据回显
      // console.log(row) // 点击编辑按钮，获取当前行的数据
    },
    handleDelete(row) {
      // console.log(row)
    },
    // 关闭新增数据窗口
    cancelDialog(value) {
      this.showDialog = value
    },
    handleCurrentChange(newPage) {
      this.page.page = newPage // 修改当前页
      this.getPageList() // 获取当前页的数据给datalist
    },
    // 获取当前页的数据
    getPageList() {
      // 取出newPage页的数据给表格数据显示
      this.datalist = tableList.slice(
        (this.page.page - 1) * this.page.size,
        this.page.page * this.page.size
      )
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

<style lang="scss" scoped></style>
