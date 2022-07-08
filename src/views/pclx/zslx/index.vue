<template>

  <div class="dashboard-container">
    <div class="app-container">

      <h3>招生类型</h3>

      <!-- 使用 PageTools 公共组件实现通用栏 -->
      <page-tools :show-before="true">
        <template slot="before">
          <!-- 新增学校信息按钮 -->
          <el-button
            type="primary"
            @click="handleClick"
          >新增招生类型</el-button>
        </template>
        <template slot="after">
          <el-button
            type="warning"
          >导入</el-button>
          <el-button type="danger">导出</el-button>
        </template>
      </page-tools>

      <!-- table组件展示数据 -->
      <Table
        :data-list="dataList"
        :keys="keys"
        :page="page"
        :loading="loading"
        @handleClick="handleClick"
        @handleDelete="handleDelete"
        @handleCurrentChange="handleCurrentChange"
      />

      <!-- 对话框组件 -->
      <add-dialog
        ref="dialog"
        :form="form"
        :rules="rules"
        :show-dialog="showDialog"
        :title-name="titleName"
        @btnCancel="btnCancel"
        @onSave="onSave"
      >
        <!-- 具名插槽传特定的内容 -->
        <template #dialog>
          <el-form-item label="招生类型序号" prop="zslx_code">
            <el-input v-model="form.zslx_code" class="input_box" :disabled="true" />
          </el-form-item>
          <el-form-item label="招生类型名称" prop="zslx_name">
            <el-input v-model="form.zslx_name" class="input_box" />
          </el-form-item>
        </template>
      </add-dialog>

    </div>
  </div>
</template>

<script>
import Table from '@/components/common/table.vue'
import AddDialog from '@/components/common/add-dialog.vue'
import { getZslxByPage, addZslx, editZslx, delZslx } from '@/api/zslx'
export default {
  components: {
    Table,
    AddDialog
  },

  data() {
    return {
      // 表格
      loading: false,
      dataList: [],
      keys: [], // 数据的keys

      // 分页
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      //  对话框
      titleName: '',
      showDialog: false,
      form: {},
      rules: {
        zslx_name: [
          { requied: true, message: '请填写招生类型名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getZslxByPage()
  },
  methods: {
    // 分页查询所有信息
    async getZslxByPage() {
      try {
        this.loading = true

        const { data } = await getZslxByPage(this.page)

        this.dataList = data.data.records
        this.page.total = data.data.total

        console.log('this.dataList', this.dataList)

        this.keys = [
          { label: '招生类型序号', value: 'zslx_code', width: '150px' },
          { label: '创建日期', value: 'create_time', width: '300px' },
          { label: '更新日期', value: 'update_time', width: '300px' },
          { label: '招生类型名称', value: 'zslx_name', width: '500px' }
        ]

        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },

    // 换页操作
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage
      //   重新获取数据
      this.getZslxByPage()
    },
    // 打开对话框
    async handleClick(row) {
      if (row.zslx_code) {
        // 编辑
        this.titleName = '编辑招生类型信息'
        this.form = row
      } else {
        // 新增
        this.titleName = '新增招生类型信息'
      }
      this.showDialog = true
    },
    // 关闭对话框
    btnCancel(value) {
      this.showDialog = value
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = { 'zslx_code': '', 'zslx_name': '' }
    },
    async onSave() {
      try {
        if (this.titleName.indexOf('新增') !== -1) {
          const { data } = await addZslx(this.form)
          if (data.code === 200) {
            this.$message.success('保存成功！')
          } else {
            this.$message.error(data.message)
          }
        } else {
          const { data } = await editZslx(this.form)
          if (data.code === 200) {
            this.$message.success('保存成功！')
          } else {
            this.$message.error(data.message)
          }
        }
      } catch (err) {
        console.log(err)
      }

      // 刷新数据
      this.getZslxByPage()
      // 关闭对话框
      this.showDialog = false
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = { 'zslx_code': '', 'zslx_name': '' }
    },

    async handleDelete(row) {
      this.$prompt('请输入DELETE', '确认删除本行数据？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator(value) {
          return value === 'DELETE'
        },
        inputErrorMessage: '输入格式不正确，无法删除数据！'
      }).then(async() => {
        await delZslx(row.zslx_code)
        this.$message({
          type: 'success',
          message: '删除数据成功'
        })
        this.getZslxByPage() // 刷新数据
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

<style lang="scss" scoped>
::v-deep .el-dialog {
  height: 240px;
  .el-dialog__body {
    height: 140px;
    overflow: hidden;
    padding: 5px 20px 0px 20px;
  }
}
</style>
