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
          >新增学校学科信息</el-button>
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
            <el-input v-if="!hidden" v-model="form.school_id" class="input_box" />
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

          <el-form-item label="门类名称">
            <el-select v-model="form.discipline_id" class="input_box" :disabled="titleName.indexOf('新增') !== -1 ? false : true" @change="disciplineChange">
              <el-option
                v-for="item in schoolDisciplines"
                :key="item.discipline_id"
                :label="item.discipline_name"
                :value="item.discipline_id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="学科名称">
            <el-select v-model="form.subject_id" class="input_box" :disabled="titleName.indexOf('新增') !== -1 ? false : true" @change="disciplineChange">
              <el-option
                v-for="item in subjectByDisciplines"
                :key="item.subject_id"
                :label="item.subject_name"
                :value="item.subject_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="重点学科" prop="school_subject_best_flag">
            <el-select v-model="form.school_subject_best_flag" class="input_box">
              <el-option
                v-for="item in school_subject_best_flag_option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="一级博士点" prop="school_subject_1_phd_flag">
            <el-select v-model="form.school_subject_1_phd_flag" class="input_box">
              <el-option
                v-for="item in school_subject_1_phd_flag_option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="一级硕士点" prop="school_subject_1_master_flag">
            <el-select v-model="form.school_subject_1_master_flag" class="input_box">
              <el-option
                v-for="item in school_subject_1_master_flag_option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="双一流学科" prop="school_subject_dual_flag">
            <el-select v-model="form.school_subject_dual_flag" class="input_box">
              <el-option
                v-for="item in school_subject_dual_flag_option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学科排名" prop="school_subject_rank">
            <el-input v-model="form.school_subject_rank" class="input_box" />
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
import { getSubjectsByDisciplineId } from '@/api/subject'
import { getSchoolSubjectsByPage, addSchoolSubject, editSchoolSubject, delSchoolSubject, getSchoolDisciplinesBySchoolId } from '@/api/school'
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

      },
      rules: {

      },
      disciplines: [], // 所有学科门类、
      disciplines_id_name: {}, // 所有门类id和name对应
      schools: [], // 所有学校信息
      schoolDisciplines: [], // 根据学校id获取学校的门类
      subjectByDisciplines: [], // 获取学校门类下的所有一级学科

      hidden: true, // 控制表单输入框的显示
      disabled: true, // 控制表单输入框的禁用状态
      school_subject_best_flag_option: [{ label: '是', value: 1 }, { label: '否', value: 0 }], //           重点学科标识	ss_best_flag_option
      school_subject_1_phd_flag_option: [{ label: '是', value: 1 }, { label: '否', value: 0 }], // 一级博士点标识	ss_1_phd_flag_option
      // ss_2_phd_flag_option: [{ label: '是', value: 1 }, { label: '否', value: 0 }], // 二级博士点标识	ss_2_phd_flag_option
      school_subject_1_master_flag_option: [{ label: '是', value: 1 }, { label: '否', value: 0 }], // 一级硕士点标识	ss_1_master_flag_option
      // ss_2_master_flag_option: [{ label: '是', value: 1 }, { label: '否', value: 0 }], // 二级硕士点标识	ss_2_master_flag_option
      school_subject_dual_flag_option: [{ label: '是', value: 1 }, { label: '否', value: 0 }] // 双一流学科标识	ss_dual_flag_option
    }
  },
  async created() {
    this.loading = true
    // 查询所有学科门类
    await this.getAllDisciplines()

    // 查询所有学校信息
    await this.getAllSchoolList()

    await this.getSchoolSubjectsByPage()

    this.loading = false
  },
  methods: {
    // 分页查询所有信息
    async getSchoolSubjectsByPage() {
      try {
        const { data } = await getSchoolSubjectsByPage(this.page)
        this.dataList = data.data.records
        this.page.total = data.data.total

        // 根据门类id获取门类名称
        this.dataList.forEach((item) => {
          item.subject_discipline_name = this.disciplines_id_name[item.subject_discipline]
        })

        this.keys = [
          { label: '序号', value: 'school_subject_code', width: '130px' },
          { label: '学校编号', value: 'school_id', width: '130px' },
          { label: '学校名称', value: 'school_name', width: '300px' },
          { label: '门类编号', value: 'subject_discipline', width: '130px' },
          { label: '门类名称', value: 'subject_discipline_name', width: '200px' },
          { label: '一级学科编号', value: 'subject_id', width: '200px' },
          { label: '一级学科名称', value: 'subject_name', width: '300px' }]
        //           重点学科标识	ss_best_flag
        // 一级博士点标识	ss_1_phd_flag
        // 二级博士点标识	ss_2_phd_flag
        // 一级硕士点标识	ss_1_master_flag
        // 二级硕士点标识	ss_2_master_flag
        // 双一流学科标识	ss_dual_flag
        // 该校该学科排名	ss_rank
      } catch (err) {
        console.log(err)
      }
    },
    // 查询所有学科门类
    async getAllDisciplines() {
      const { data } = await getAllDisciplines()
      this.disciplines = data.data

      this.disciplines.forEach((item) => {
        this.disciplines_id_name[item.discipline_id] = item.discipline_name
      })
    },

    disciplineChange(discipline_id) {
      this.getSubjectsByDisciplineChange(discipline_id)
    },
    // 根据学校id查询学校所有门类
    async getSchoolDisciplinesBySchoolId(school_id) {
      const { data } = await getSchoolDisciplinesBySchoolId(school_id)
      this.schoolDisciplines = data.data
    },

    // 根据discipline_id查询所有一级学科
    async getSubjectsByDisciplineChange(discipline_id) {
      const { data } = await getSubjectsByDisciplineId(discipline_id)
      this.subjectByDisciplines = data.data
    },

    // 获取所有学校列表
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
      this.getSchoolDisciplinesBySchoolId(item.school_id)
    },
    // 换页操作
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage
      //   重新获取数据
      this.getSchoolSubjectsByPage()
    },
    // 打开对话框
    async handleClick(row) {
      if (row.subject_code) {
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

      }
    },
    async onSave() {
      console.log('onSave', this.form)
      try {
        if (this.titleName.indexOf('新增') !== -1) {
          const { data } = await addSchoolSubject({
            'school_subject_school': this.form.school_id,
            'school_subject_subject': this.form.subject_id,
            'school_subject_best_flag': this.form.school_subject_best_flag,
            'school_subject_1_phd_flag': this.form.school_subject_1_phd_flag,
            'school_subject_1_master_flag': this.form.school_subject_1_master_flag,
            'school_subject_dual_flag': this.form.school_subject_dual_flag,
            'school_subject_rank': this.form.school_subject_rank
          })
          if (data.code === 200) {
            this.$message.success('保存成功！')
          } else {
            this.$message.error(data.message)
          }
        } else {
          const { data } = await editSchoolSubject(
            {
              'school_subject_code': this.form.school_subject_code,
              'school_subject_school': this.form.school_id,
              'school_subject_subject': this.form.subject_id,
              'school_subject_best_flag': this.form.school_subject_best_flag,
              'school_subject_1_phd_flag': this.form.school_subject_1_phd_flag,
              'school_subject_1_master_flag': this.form.school_subject_1_master_flag,
              'school_subject_dual_flag': this.form.school_subject_dual_flag,
              'school_subject_rank': this.form.school_subject_rank
            }
          )
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
      this.getSchoolSubjectsByPage()
      // 关闭对话框
      this.showDialog = false
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = {

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
        await delSchoolSubject(row.subject_code)
        this.$message({
          type: 'success',
          message: '删除数据成功'
        })
        this.getSchoolSubjectsByPage() // 刷新数据
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
  height: 600px;
  .el-dialog__body {
    height: 480px;
    overflow: hidden;
    padding: 5px 20px 0px 20px;
  }
}
</style>
