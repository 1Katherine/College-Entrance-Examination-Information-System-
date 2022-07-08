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
          >新增专业</el-button>
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
          <el-form-item label="专业序号" prop="major_code">
            <el-input v-model="form.major_code" class="input_box" :disabled="true" />
          </el-form-item>
          <el-form-item label="专业id" prop="major_id">
            <el-input v-model="form.major_id" class="input_box" :disabled="titleName.indexOf('新增')!==-1 ? false : true" />
          </el-form-item>
          <el-form-item label="专业名称" prop="major_name">
            <el-input v-model="form.major_name" class="input_box" />
          </el-form-item>
          <el-form-item label="所属一级学科" prop="major_subject">
            <el-select v-model="form.major_subject" class="input_box">
              <el-option v-for="item in allSubjects" :key="item.subject_id" :label="item.subject_name" :value="item.subject_id" />
            </el-select>
          </el-form-item>
        </template>
      </add-dialog>

    </div>
  </div>
</template>

<script>
import { getMajorsByPage, addMajor, editMajor, delMajor } from '@/api/major'
import { getSubjectsByPage } from '@/api/subject'
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
      loading: false,
      dataList: [],
      keys: [], // 数据的keys
      // 所有一级学科
      allSubjects: [],
      // 学科id和name对应关系
      subject_id_name: {},
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
        major_id: [{ required: true, message: '请填写专业代码', trigger: 'blur' }],
        major_name: [
          { required: true, message: '请填写专业名称', trigger: 'blur' }
        ],
        major_subject: [
          { required: true, message: '请填写选择一级学科', trigger: 'change' }
        ]

      }
    }
  },
  async created() {
    this.loading = true
    // 获取所有专业
    await this.getAllSubjects()
    // 分页获取专业信息
    await this.getMajorsByPage()
    this.loading = false
  },
  methods: {
    // 分页查询所有信息
    async getMajorsByPage() {
      try {
        const { data } = await getMajorsByPage(this.page)
        this.page.total = data.data.total
        this.dataList = data.data
        // 获取一级学科id对应的中文名
        this.dataList.forEach((item) => {
          item.subject_name = this.subject_id_name[item.major_subject]
        })

        this.keys = [
          { label: '专业序号', value: 'major_code', width: '150px' },
          { label: '创建日期', value: 'create_time', width: '300px' },
          { label: '更新日期', value: 'update_time', width: '300px' },
          { label: '专业id', value: 'major_id', width: '150px' },
          { label: '专业名称', value: 'major_name', width: '250px' },
          { label: '所属一级学科', value: 'subject_name', width: '250px' }]
      } catch (err) {
        console.log(err)
      }
    },
    // 获取所有一级学科
    async getAllSubjects() {
      const { data } = await getSubjectsByPage({ currentPage: 1, pageSize: 1000000 })
      this.allSubjects = data.data.records
      //   将一级学科id与中文名对应
      this.allSubjects.forEach((item) => {
        this.subject_id_name[item.subject_id] = item.subject_name
      })
    },
    // 换页操作
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage
      //   重新获取数据
      this.getSubjectsByPage()
    },
    // 打开对话框
    async handleClick(row) {
      if (row.major_code) {
        // 编辑
        this.titleName = '编辑专业信息'
        this.form = row
      } else {
        // 新增
        this.titleName = '新增专业信息'
      }
      this.showDialog = true
    },
    // 关闭对话框
    btnCancel(value) {
      this.showDialog = value
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = { 'major_code': '', 'major_id': '', 'major_name': '', 'major_subject': '' }
    },
    async onSave() {
      try {
        if (this.titleName.indexOf('新增') !== -1) {
          const { data } = await addMajor(this.form)
          if (data.code === 200) {
            this.$message.success('保存成功！')
          } else {
            this.$message.error(data.message)
          }
        } else {
          this.form.major_code = Number.parseInt(this.form.major_code)
          const { data } = await editMajor(this.form)
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
      this.getMajorsByPage()
      // 关闭对话框
      this.showDialog = false
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = { 'major_code': '', 'major_id': '', 'major_name': '', 'major_subject': '' }
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
        await delMajor(row.major_code)
        this.$message({
          type: 'success',
          message: '删除数据成功'
        })
        this.getMajorsByPage() // 刷新数据
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
