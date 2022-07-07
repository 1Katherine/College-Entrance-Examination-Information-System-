<!--
 * @Author: Yang
 * @Date: 2022-06-18 17:31:12
 * @LastEditors: Yang
 * @LastEditTime: 2022-06-28 15:39:14
 * @Description: file content
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 使用 PageTools 公共组件实现通用栏 -->
      <page-tools :show-before="true">
        <template slot="before">
          <el-button
            type="primary"
            @click="handleClick"
          >新增门类录取分数线信息</el-button>
        </template>
        <template slot="after">
          <el-button
            type="warning"
            @click="$router.push('/import')"
          >导入</el-button>
          <el-button type="danger" @click="exportData">导出</el-button>
        </template>
      </page-tools>
      <!-- 信息显示表格 -->
      <el-card>
        <el-table :data="datalist" style="width: 100%" stripe border>
          <el-table-column fixed="" type="index" label="序号" width="60" />
          <el-table-column
            prop="lq_school_type_code"
            label="录取编号"
            width="140"
          />
          <el-table-column label="学校名" width="200">
            <template slot-scope="scope">
              <el-tag size="medium">{{
                scope.row.lq_school_type_school
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="lq_school_type_subject"
            label="门类"
            width="100"
          />
          <el-table-column
            prop="lq_school_type_year"
            label="年份"
            width="140"
          />
          <el-table-column
            prop="lq_school_type_province"
            label="省份"
            width="140"
          />
          <el-table-column
            prop="lq_school_type_max_score"
            label="最高分"
            width="100"
          />
          <el-table-column
            prop="lq_school_type_min_score"
            label="最低分"
            width="100"
          />
          <el-table-column
            prop="lq_school_type_high_rank"
            label="最高排名"
            width="100"
          />
          <el-table-column
            prop="lq_school_type_low_rank"
            label="最低排名"
            width="100"
          />
          <el-table-column
            prop="lq_school_type_p_line"
            label="省控线"
            width="80"
          />
          <el-table-column
            prop="lq_school_type_average_score"
            label="平均分"
            width="80"
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
          :current-page="page.page"
          :page-size="page.size"
          layout="prev, pager, next"
          :total="page.total"
          @current-change="handleCurrentChange"
        />
      </el-row>

      <!-- 新增招生信息的弹框组件 -->
      <AddtypeScore
        :show-dialog.sync="showDialog"
        :title-name="titleName"
        @cancelDialog="cancelDialog"
      />
    </div>
  </div>
</template>

<script>
import AddtypeScore from './add-typeScore.vue'
var data = {
  lq_school_type_code: '5031',
  lq_school_type_school: '重庆电力高等专科学校',
  lq_school_type_subject: '理科/理工类',
  lq_school_type_year: '2021',
  lq_school_type_province: '四川省',
  lq_school_type_max_score: 502,
  lq_school_type_min_score: 384,
  lq_school_type_average_score: 431,
  lq_school_type_high_rank: 19023,
  lq_school_type_low_rank: 22395,
  lq_school_type_p_line: 180
}
var data1 = {
  lq_school_type_code: '5031',
  lq_school_type_school: '重庆电力高等专科学校',
  lq_school_type_subject: '文科/历史类',
  lq_school_type_year: '2021',
  lq_school_type_province: '四川省',
  lq_school_type_max_score: 515,
  lq_school_type_min_score: 499,
  lq_school_type_average_score: 431,
  lq_school_type_high_rank: 172989,
  lq_school_type_low_rank: 210294,
  lq_school_type_p_line: 180
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
  data
]
export default {
  name: 'TypeScoreInfo',
  components: {
    AddtypeScore
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
      showDialog: false // 新增招生信息弹出框是否显示
    }
  },
  created() {
    this.getSchoolListByPage() // 获取所有数据
  },
  methods: {

    getSchoolListByPage() { // 根据页码获取当前所有数据
      this.page.total = tableList.length // 修改分页组件的总数居数量
      this.datalist = tableList.slice((this.page.page - 1) * this.page.size,
        this.page.page * this.page.size) // 为表格附上第一页的数据
    },
    handleClick(row) {
      this.showDialog = true // 弹出新增数据对话框
      if (row.lq_school_type_code) {
        this.titleName = '编辑门类录取信息'
      } else {
        this.titleName = '新增门类录取信息'
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
        学校门类编号: 'lq_school_type_code',
        学校名: 'lq_school_type_school',
        门类: 'lq_school_type_subject',
        年份: 'lq_school_type_year',
        省份: 'lq_school_type_province',
        最高分: 'lq_school_type_max_score',
        最低分: 'lq_school_type_min_score',
        平均分: 'lq_school_type_average_score',
        最高排名: 'lq_school_type_high_rank',
        最低排名: 'lq_school_type_low_rank',
        省控线: 'lq_school_type_low_rank'
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
          filename: '门类录取分数信息表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
