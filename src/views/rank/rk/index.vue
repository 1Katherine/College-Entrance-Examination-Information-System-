<template>

  <div class="dashboard-container">
    <div class="app-container">
      <h3>软科排名</h3>
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
          <el-form-item label="排名编号" prop="qs_code">
            <el-input v-model="form.qs_code" class="input_box" :disabled="titleName.indexOf('新增')!==-1 ? false : true" />
          </el-form-item>
          <el-form-item label="排名" prop="qs_rank">
            <el-input v-model="form.qs_rank" class="input_box" :disabled="titleName.indexOf('新增')!==-1 ? false : true" />
          </el-form-item>
          <el-form-item label="学校编号" prop="qs_school">
            <el-input v-model="form.qs_school" class="input_box" />
          </el-form-item>
          <el-form-item label="学校名称" prop="qs_schoolName">
            <el-input v-model="form.qs_schoolName" class="input_box" />
          </el-form-item>
        </template>
      </add-dialog>

    </div>
  </div>
</template>

<script>
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

      }
    }
  },
  created() {

  },
  methods: {
    // 分页查询所有信息
    getSubjectsByPage() {
      try {
        this.loading = true

        this.keys = [
          { label: '一级学科编号', value: 'subject_code', width: '150px' },
          { label: '创建日期', value: 'create_time', width: '300px' },
          { label: '更新日期', value: 'update_time', width: '300px' },
          { label: '一级学科id', value: 'subject_id', width: '150px' },
          { label: '一级学科名称', value: 'subject_name', width: '300px' },
          { label: '所属学科门类', value: 'discipline_name', width: '150px' }]

        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },

    // 换页操作
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage
      //   重新获取数据
    },
    // 打开对话框
    async handleClick(row) {
      if (row.subject_code) {
        // 编辑
        this.titleName = '编辑一级学科信息'
        this.form = row
      } else {
        // 新增
        this.titleName = '新增一级学科信息'
      }
      this.showDialog = true
    },
    // 关闭对话框
    btnCancel(value) {
      this.showDialog = value
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = { 'subject_id': '', 'subject_code': '', 'subject_name': '', 'subject_discipline': '' }
    },
    onSave() {

    },
    // async onSave() {
    //   try {
    //     if (this.titleName.indexOf('新增') !== -1) {
    //       const { data } = await addSubject(this.form)
    //       if (data.code === 200) {
    //         this.$message.success('保存成功！')
    //       } else {
    //         this.$message.error(data.message)
    //       }
    //     } else {
    //       this.form.subject_code = Number.parseInt(this.form.subject_code)
    //       const { data } = await editSubject(this.form)
    //       if (data.code === 200) {
    //         this.$message.success('保存成功！')
    //       } else {
    //         this.$message.error(data.message)
    //       }
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }

    //   // 刷新数据
    //   this.getSubjectsByPage()
    //   // 关闭对话框
    //   this.showDialog = false
    //   // 清空子组件表单校验
    //   this.$refs.dialog.$refs.form.resetFields()
    //   // 清空数据
    //   this.form = { 'subject_id': '', 'subject_code': '', 'subject_name': '', 'subject_discipline': '' }
    // },

    handleDelete(row) {

    }
    //     async handleDelete(row) {
    //       this.$prompt('请输入DELETE', '确认删除本行数据？', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         inputValidator(value) {
    //           return value === 'DELETE'
    //         },
    //         inputErrorMessage: '输入格式不正确，无法删除数据！'
    //       }).then(async() => {
    //         await delSubject(row.subject_code)
    //         this.$message({
    //           type: 'success',
    //           message: '删除数据成功'
    //         })
    //         this.getSubjectsByPage() // 刷新数据
    //       }).catch(() => {
    //         this.$message({
    //           type: 'info',
    //           message: '取消删除操作'
    //         })
    //       })
    //     }
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
