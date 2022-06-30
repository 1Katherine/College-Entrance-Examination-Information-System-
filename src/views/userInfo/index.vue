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
        <span slot="before" style="padding-left: 20px; ">总共 {{ page.total }} 条数据</span>
      </page-tools>

      <!-- 信息显示表格 -->
      <el-card>
        <el-table :data="datalist" style="width: 100%" stripe border>
          <el-table-column fixed="" type="index" label="序号" width="100" />
          <el-table-column prop="create_time" label="创建日期" />
          <el-table-column prop="username" label="用户名" />
          <el-table-column prop="password" label="密码" />
          <el-table-column prop="is_admin" label="权限">
            <template slot-scope="scope">{{ scope.row.is_admin === 0 ? '普通用户' : '管理员' }}</template>
          </el-table-column>
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
      <EditUserInfo ref="editUserInfo" :form="form" :show-dialog.sync="showDialog" @cancelDialog="cancelDialog" />
    </div>

  </div>
</template>

<script>
import { getAllUsers } from '@/api/user'
import { getUserById } from '@/api/user'
import EditUserInfo from './edit-user-info'
export default {
  name: 'UserInfo',
  components: {
    EditUserInfo
  },
  data() {
    return {
      // 接收表格数据（在mounted中，获取数据，同时计算数据总数
      datalist: [],
      // 分页相关数据
      page: {
        currentPage: 1, // 当前页数
        pageSize: 2, // 每一页放的数据个数
        total: 0 // 数据总数，需要在所有数据挂载完毕后才能在mounted中计算数据总数，
      },
      titleName: '新增',
      showDialog: false, // 新增招生信息弹出框是否显示
      form: {} // 传递给子组件表单的数据
    }
  },
  created() {
    this.getUserList() // 获取所有数据
  },
  methods: {
    async getUserList() { // 根据页码获取当前所有数据
      const { data } = await getAllUsers(
        { currentPage: this.page.currentPage,
          pageSize: this.page.pageSize })
      this.page.total = data.data.total
      this.datalist = data.data.records
    },
    async handleClick(row) {
      const { data } = await getUserById(row.uid) // 根据本行的user.uid获取userInfo
      this.form = data.data
      this.showDialog = true
    },
    handleDelete(row) {

    },
    // 关闭新增数据窗口
    cancelDialog(value) {
      this.form = {} // 清空编辑表单里的数据
      this.showDialog = value
    },
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage // 修改当前页
      this.getUserList() // 获取当前页的数据给datalist
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
