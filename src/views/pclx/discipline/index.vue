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
          >新增学科门类</el-button>
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
        :loading="loading"
        :data-list="dataList"
        :keys="keys"
        :page="page"
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
          <el-form-item label="学科门类编号" prop="discipline_code">
            <el-input v-model="form.discipline_code" class="input_box" :disabled="titleName.indexOf('新增')!==-1 ? false : true" />
          </el-form-item>
          <el-form-item label="学科门类id" prop="discipline_id">
            <el-input v-model="form.discipline_id" class="input_box" :disabled="titleName.indexOf('新增')!==-1 ? false : true" />
          </el-form-item>
          <el-form-item label="学科门类名称" prop="discipline_name">
            <el-input v-model="form.discipline_name" class="input_box" />
          </el-form-item>
          <el-form-item label="学科门类等级" prop="discipline_level">
            <el-select v-model="form.discipline_level" class="input_box">
              <el-option v-for="item in d_level" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </template>
      </add-dialog>

    </div>
  </div>
</template>

<script>
import { getDisciplinesByPage, addDiscipline, editDiscipline, delDiscipline } from '@/api/discipline'
import Table from '@/components/common/table.vue'
import AddDialog from '@/components/common/add-dialog.vue'
export default {
  components: {
    Table,
    AddDialog
  },

  data() {
    return {
      // 表格
      dataList: [],
      keys: [], // 数据的keys
      loading: false,
      // 分页
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      //  对话框
      titleName: '',
      d_level: ['本科', '专科'],
      showDialog: false,
      form: {},
      rules: {
        discipline_code: [
          { required: true, message: '请填写学科门类编号', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '学科门类编号只能是数字', trigger: 'blur' }
        ],
        discipline_id: [
          { required: true, message: '请填写学科门类id', trigger: 'blur' },
          { pattern: /^[0-9][0-9]$/, message: '学科门类id只能为两位数字', trigger: 'blur' }
        ],
        discipline_name: [
          { required: true, message: '请填写学科门类名称', trigger: 'blur' },
          { pattern: /^[\u0391-\uFFE5A-Za-z]+$/, message: '学科门类名称必须是中文', trigger: 'blur'
          }

        ],
        discipline_level: [
          { required: true, message: '请选择门类等级', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getDisciplinesByPage()
  },
  methods: {
    // 分页查询所有批次信息
    async getDisciplinesByPage() {
      try {
        this.loading = true
        const { data } = await getDisciplinesByPage(this.page)
        this.page.total = data.data.total
        this.dataList = data.data.records
        this.keys = [
          { label: '学科门类编号', value: 'discipline_code', width: '150px' },
          { label: '创建日期', value: 'create_time', width: '300px' },
          { label: '更新日期', value: 'update_time', width: '300px' },
          { label: '学科门类id', value: 'discipline_id', width: '150px' },
          { label: '学科门类名称', value: 'discipline_name', width: '300px' },
          { label: '学科门类等级', value: 'discipline_level', width: '300px' }]
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    // 换页操作
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage
      //   重新获取数据
      this.getDisciplinesByPage()
    },
    // 打开对话框
    async handleClick(row) {
      if (row.discipline_code) {
        // 编辑
        this.titleName = '编辑学科门类信息'
        this.form = row
      } else {
        // 新增
        this.titleName = '新增学科门类信息'
      }
      this.showDialog = true
    },
    // 关闭对话框
    btnCancel(value) {
      this.showDialog = value
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = { 'discipline_id': '', 'discipline_code': '', 'discipline_name': '', 'discipline_level': '' }
    },
    async onSave() {
      try {
        if (this.titleName.indexOf('新增') !== -1) {
          const { data } = await addDiscipline(this.form)
          if (data.code === 200) {
            this.$message.success('保存成功！')
          } else {
            this.$message.error(data.message)
          }
        } else {
          this.form.discipline_code = Number.parseInt(this.form.discipline_code)
          const { data } = await editDiscipline(this.form)
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
      this.getDisciplinesByPage()
      // 关闭对话框
      this.showDialog = false
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = { 'discipline_id': '', 'discipline_code': '', 'discipline_name': '', 'discipline_level': '' }
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
        await delDiscipline(row.discipline_code)
        this.$message({
          type: 'success',
          message: '删除数据成功'
        })
        this.getDisciplinesByPage() // 刷新数据
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
  height: 360px;
  .el-dialog__body {
    height: 260px;
    overflow: hidden;
    padding: 5px 20px 0px 20px;
  }
}
</style>
