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
      <!-- 使用 PageTools 公共组件实现通用栏 -->
      <page-tools :show-before="true">
        <span slot="before">共n条记录 </span>
        <template slot="after">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
          >导入</el-button>
          <el-button
            size="small"
            type="danger"
            @click="exportData"
          >导出</el-button>
          <!-- 新增学校信息按钮 -->
          <el-button
            size="small"
            type="primary"
            @click="showDialog = true"
          >新增招生信息</el-button>
        </template>
      </page-tools>
      <!-- 信息显示表格 -->
      <el-table :data="datalist" style="width: 100%" stripe>
        <el-table-column fixed="" type="index" label="序号" width="100" />
        <el-table-column prop="name" label="学校" width="140" />
        <el-table-column prop="province" label="省份" width="100" />
        <el-table-column prop="major" label="专业" width="140" />
        <el-table-column prop="year" label="年份" width="100" />
        <el-table-column prop="zsrs" label="招生人数" width="100" />
        <el-table-column prop="zslx" label="招生类型" width="140" />
        <el-table-column prop="zspc" label="招生批次" width="140" />
        <el-table-column prop="qjjh" label="是否有强基计划" width="140" />
        <el-table-column fixed="right" fit label="操作">
          <!-- 通过作用域插槽，通过点击行，获得父组件行的数据 -->
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleClick(scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row justify="center" type="flex" align="middle" style="height: 60px">
        <el-pagination layout="prev, pager, next" :total="1000" />
      </el-row>

      <!-- 新增招生信息的弹框组件 -->
      <add-admission
        :show-dialog.sync="showDialog"
        @cancelDialog="cancelDialog"
      />
    </div>
  </div>
</template>

<script>
import AddAdmission from './add-admission.vue'
export default {
  name: 'SchoolAdmission',
  components: {
    AddAdmission
  },
  data() {
    return {
      // 表格数据
      datalist: [
        {
          name: '华中科技大学',
          province: '湖北',
          major: '计算机科学与技术',
          year: 2022,
          zsrs: 12,
          zslx: '本科',
          zspc: '本科一批',
          qjjh: '否'
        },
        {
          name: '武汉大学',
          province: '湖北',
          major: '软件工程',
          year: 2022,
          zsrs: 2,
          zslx: '本科',
          zspc: '本科一批',
          qjjh: '否'
        },
        {
          name: '四川大学',
          province: '四川',
          major: '食品科学与工程',
          year: 2022,
          zsrs: 19,
          zslx: '本科',
          zspc: '本科一批',
          qjjh: '否'
        },
        {
          name: '国防科技大学',
          province: '四川',
          major: '计算机科学与技术',
          year: 2022,
          zsrs: 20,
          zslx: '本科',
          zspc: '本科一批',
          qjjh: '有'
        }
      ],

      showDialog: false // 新增招生信息弹出框是否显示
    }
  },
  methods: {
    handleClick(row) {
      console.log(row) // 点击编辑按钮，获取当前行的数据
    },
    handleDelete(row) {
      console.log(row)
    },
    cancelDialog(value) {
      this.showDialog = value
    },
    // 导出表格方法
    exportData() {
      // 表头对应关系
      const headers = {
        学校名: 'name',
        所属省份: 'province',
        招生专业: 'major',
        招生年份: 'year',
        招生人数: 'zsrs',
        招生类型: 'zslx',
        招生批次: 'zspc',
        是否有强基计划: 'qjjh'
      }
      // var myheaders = Object.keys(this.datalist[0])
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
          filename: '学校招生信息表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
