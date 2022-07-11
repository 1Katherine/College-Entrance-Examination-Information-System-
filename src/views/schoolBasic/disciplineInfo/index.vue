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
          >新增学校门类信息</el-button>
        </template>
      </page-tools>

      <!-- 表格组件 -->
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
          <!-- （表单显示的是学校名称）请求传入的是学校编号 -->
          <el-form-item v-if="!hidden" label="学校id">
            <el-input
              v-if="!hidden"
              v-model="form.school_id"
              class="input_box"
            />
          </el-form-item>
          <el-form-item label="学校" prop="school_name">
            <el-autocomplete
              v-model="form.school_name"
              :disabled="titleName.indexOf('新增') !== -1 ? false : true"
              class="inline-input input_box"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              clearable
              @select="handleSelect"
            />
          </el-form-item>

          <el-form-item label="门类名称" prop="discipline_id">
            <el-select v-model="form.discipline_id" class="input_box">
              <el-option
                v-for="item in disciplines"
                :key="item.discipline_id"
                :label="item.discipline_name"
                :value="item.discipline_id"
              />
            </el-select>
          </el-form-item>

        </template>
      </add-dialog>
    </div>
  </div>
</template>

<script>
import Table from '@/components/common/table.vue'
import AddDialog from '@/components/common/add-dialog.vue'
import { getAllDisciplines } from '@/api/discipline'
import { getAllSchoolList } from '@/api/school'
import { getSchoolDisciplinesByPage, addSchoolDiscipline, editSchoolDiscipline, delSchoolDiscipline } from '@/api/school'
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
      form: {
        discipline_id: '',
        school_id: ''
      },
      rules: {
        discipline_id: [
          { required: true, message: '请选择学科门类', trigger: 'change' }
        ],
        school_name: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ]
      },
      disciplines: [], // 所有学科门类
      schools: [], // 所有学校信息
      hidden: true, // 控制表单输入框的显示
      disabled: true // 控制表单输入框的禁用状态
    }
  },
  async created() {
    this.loading = true
    await this.getSchoolDisciplinesByPage()
    // 查询所有学科门类
    await this.getAllDisciplines()
    // 查询所有学校信息
    await this.getAllSchoolList()
    this.loading = false
  },
  methods: {
    // 分页查询所有信息
    async getSchoolDisciplinesByPage() {
      try {
        const { data } = await getSchoolDisciplinesByPage(this.page)
        this.dataList = data.data.records
        this.page.total = data.data.total

        console.log(this.dataList)

        this.keys = [
          { label: '序号', value: 'school_discipline_code', width: '150px' },
          { label: '学校编号', value: 'school_id', width: '300px' },
          { label: '学校名称', value: 'school_name', width: '300px' },
          { label: '门类编号', value: 'discipline_id', width: '200px' },
          { label: '学科门类', value: 'discipline_name', width: '200px' },
          { label: '门类等级', value: 'discipline_level', width: '200px' }]
      } catch (err) {
        console.log(err)
      }
    },
    // 查询所有学科门类
    async getAllDisciplines() {
      const { data } = await getAllDisciplines()
      this.disciplines = data.data
    },
    async getAllSchoolList() {
      const { data } = await getAllSchoolList()
      this.schools = data.data
    },

    // 表单输入框建议函数
    querySearch(queryString, callback) {
      var schools = this.schools
      var results = queryString ? schools.filter(this.createFilter(queryString)) : schools
      // 结果需要有value字段
      results.forEach((item) => {
        item.value = item.school_name
      })
      // 调用 callback 返回建议列表的数据
      callback(results)
    },
    // 输出狂建议匹配
    createFilter(queryString) {
      return (schools) => {
        return (schools.school_name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    // 获取学校名对应的学校id
    handleSelect(item) {
      this.form.school_id = item.school_id
    },
    // 换页操作
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage
      //   重新获取数据
      this.getSchoolDisciplinesByPage()
    },
    // 打开对话框
    async handleClick(row) {
      if (row.school_discipline_code) {
        // 编辑
        this.titleName = '编辑信息'
        this.form = row
      } else {
        // 新增
        this.titleName = '新增信息'
      }
      this.showDialog = true
    },

    // 关闭对话框
    btnCancel(value) {
      this.showDialog = value
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = {
        discipline_id: '',
        school_id: ''
      }
    },
    async onSave() {
      console.log('discipline_id', this.form.discipline_id, ' , ', this.form.school_id)
      try {
        if (this.titleName.indexOf('新增') !== -1) {
          const { data } = await addSchoolDiscipline({
            'school_discipline_school': this.form.school_id,
            'school_discipline_discipline': this.form.discipline_id
          })
          if (data.code === 200) {
            this.$message.success('保存成功！')
          } else {
            this.$message.error(data.message)
          }
        } else {
          const { data } = await editSchoolDiscipline({
            'school_discipline_code': this.form.school_discipline_code,
            'school_discipline_school': this.form.school_id,
            'school_discipline_discipline': this.form.discipline_id
          })
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
      this.getSchoolDisciplinesByPage()
      // 关闭对话框
      this.showDialog = false
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = {
        discipline_id: '',
        school_id: ''
      }
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
        await delSchoolDiscipline(row.school_discipline_code)
        this.$message({
          type: 'success',
          message: '删除数据成功'
        })
        this.getSchoolDisciplinesByPage() // 刷新数据
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
  height: 260px;
  .el-dialog__body {
    height: 160px;
    overflow: hidden;
    padding: 5px 20px 0px 20px;
  }
}
</style>
